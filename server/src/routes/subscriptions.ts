import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabase } from '../index.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Debug: Log Razorpay credentials to verify environment variable loading
console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Secret:', process.env.RAZORPAY_KEY_SECRET);
// Initialize Razorpay with credentials from environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret_key_minimum_length'
});

// Subscription plans configuration
const PLANS = {
    weekly: {
        id: 'weekly',
        name: '1 Week Plan',
        amount: 100,
        currency: 'INR',
        interval: 'weekly',
        period: 1,
        days: 7
    },
    monthly: {
        id: 'monthly',
        name: '1 Month Plan',
        amount: 300,
        currency: 'INR',
        interval: 'monthly',
        period: 1,
        days: 30
    },
    quarterly: {
        id: 'quarterly',
        name: 'Quarterly Plan',
        amount: 500,
        currency: 'INR',
        interval: 'quarterly',
        period: 3,
        days: 90
    },
    semiannual: {
        id: 'semiannual',
        name: 'Semi-Annual Plan',
        amount: 900,
        currency: 'INR',
        interval: 'semiannual',
        period: 6,
        days: 180
    }
};

/**
 * GET /api/subscriptions/plans
 * Get available subscription plans
 */
router.get('/plans', (req, res) => {
    const plans = Object.values(PLANS);
    res.json({ plans });
});

/**
 * POST /api/subscriptions/create
 * Create a new subscription
 */
router.post('/create', authenticateUser, async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user.id;

        if (!planId || !PLANS[planId as keyof typeof PLANS]) {
            return res.status(400).json({ error: 'Invalid plan ID' });
        }

        const plan = PLANS[planId as keyof typeof PLANS];

        // Check if user already has an active subscription
        const { data: existingSubscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single();

        if (existingSubscription) {
            return res.status(400).json({
                error: 'You already have an active subscription',
                subscription: existingSubscription
            });
        }

        // Create Razorpay subscription
        const razorpaySubscription = await razorpay.subscriptions.create({
            plan_id: planId,
            total_count: plan.period,
            quantity: 1,
            customer_notify: 1,
            notes: {
                user_id: userId,
                plan_name: plan.name
            }
        });

        // Calculate subscription period based on days
        const currentStart = new Date();
        const currentEnd = new Date();
        currentEnd.setDate(currentEnd.getDate() + plan.days);

        // Store in database
        const { data: subscription, error } = await supabase
            .from('subscriptions')
            .insert({
                user_id: userId,
                razorpay_subscription_id: razorpaySubscription.id,
                plan_id: planId,
                plan_name: plan.name,
                status: 'created',
                current_start: currentStart.toISOString(),
                current_end: currentEnd.toISOString(),
                amount: plan.amount,
                currency: plan.currency
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating subscription in DB:', error);
            return res.status(500).json({ error: 'Failed to create subscription' });
        }

        res.json({
            subscription: razorpaySubscription,
            dbSubscription: subscription
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
});

/**
 * POST /api/subscriptions/verify-payment
 * Verify Razorpay payment signature
 */
router.post('/verify-payment', authenticateUser, async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
        const userId = req.user.id;

        // Verify signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
            .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ error: 'Invalid payment signature' });
        }

        // Update subscription status to active
        const { error: updateError } = await supabase
            .from('subscriptions')
            .update({ status: 'active' })
            .eq('razorpay_subscription_id', razorpay_subscription_id)
            .eq('user_id', userId);

        if (updateError) {
            console.error('Error updating subscription:', updateError);
            return res.status(500).json({ error: 'Failed to activate subscription' });
        }

        // Update user subscription status
        await supabase
            .from('users')
            .update({ subscription_status: 'active' })
            .eq('id', userId);

        // Record payment transaction
        await supabase
            .from('payment_transactions')
            .insert({
                user_id: userId,
                razorpay_payment_id,
                amount: 0, // Will be updated by webhook
                currency: 'INR',
                status: 'captured'
            });

        res.json({ success: true, message: 'Payment verified and subscription activated' });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

/**
 * GET /api/subscriptions/status
 * Get user's subscription status
 */
router.get('/status', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;

        const { data: subscription, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error || !subscription) {
            return res.json({
                hasSubscription: false,
                status: 'none'
            });
        }

        const isActive = subscription.status === 'active' &&
            new Date(subscription.current_end) > new Date();

        res.json({
            hasSubscription: true,
            isActive,
            subscription
        });
    } catch (error) {
        console.error('Error fetching subscription status:', error);
        res.status(500).json({ error: 'Failed to fetch subscription status' });
    }
});

/**
 * POST /api/subscriptions/webhook
 * Razorpay webhook handler
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const signature = req.headers['x-razorpay-signature'] as string;
        const body = req.body.toString();

        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
            .update(body)
            .digest('hex');

        if (signature !== expectedSignature) {
            console.error('Invalid webhook signature');
            return res.status(400).json({ error: 'Invalid signature' });
        }

        const event = JSON.parse(body);
        const eventType = event.event;
        const payload = event.payload.subscription?.entity || event.payload.payment?.entity;

        console.log('Webhook event:', eventType, payload);

        // Handle different webhook events
        switch (eventType) {
            case 'subscription.activated':
            case 'subscription.charged':
                await supabase
                    .from('subscriptions')
                    .update({
                        status: 'active',
                        current_start: new Date(payload.current_start * 1000).toISOString(),
                        current_end: new Date(payload.current_end * 1000).toISOString()
                    })
                    .eq('razorpay_subscription_id', payload.id);
                break;

            case 'subscription.cancelled':
            case 'subscription.completed':
                await supabase
                    .from('subscriptions')
                    .update({ status: payload.status })
                    .eq('razorpay_subscription_id', payload.id);
                break;

            case 'subscription.paused':
            case 'subscription.halted':
                await supabase
                    .from('subscriptions')
                    .update({ status: payload.status })
                    .eq('razorpay_subscription_id', payload.id);
                break;
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

export default router;
