
/// <reference types="node" />

import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

async function cancelAndResendPaymentLink(userId: string) {
    console.log(`\n🔄 Cancelling old subscription and creating new payment link...\n`);

    try {
        // 1. Get user's subscription
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (!subscription) {
            console.error('❌ No subscription found');
            return;
        }

        console.log(`Found subscription: ${subscription.razorpay_subscription_id}`);
        console.log(`Status: ${subscription.status}`);

        // 2. Cancel old subscription in Razorpay (if not paid)
        try {
            const rzpSub = await razorpay.subscriptions.fetch(subscription.razorpay_subscription_id);
            
            if (rzpSub.paid_count === 0 && rzpSub.status === 'created') {
                console.log('Cancelling unpaid subscription...');
                await razorpay.subscriptions.cancel(subscription.razorpay_subscription_id);
                console.log('✅ Cancelled in Razorpay');
            }
        } catch (error) {
            console.log('⚠️ Could not cancel in Razorpay (might already be cancelled)');
        }

        // 3. Mark as cancelled in DB
        await supabase
            .from('subscriptions')
            .update({ status: 'cancelled' })
            .eq('id', subscription.id);
        console.log('✅ Marked as cancelled in database');

        // 4. Get user info
        const { data: user } = await supabase
            .from('users')
            .select('email')
            .eq('id', userId)
            .single();

        console.log(`\n📧 User should create a new subscription from the app.`);
        console.log(`   Email: ${user?.email}`);
        console.log(`\nOr you can manually create a new subscription via the API.`);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

const userId = process.argv[2];

if (!userId) {
    console.log('Usage: node cancel-and-resend.js <userId>');
    console.log('Example: node cancel-and-resend.js 4c4821b3-98ca-41dd-a047-fc25a895c90e');
    process.exit(1);
}

cancelAndResendPaymentLink(userId).catch(console.error);
