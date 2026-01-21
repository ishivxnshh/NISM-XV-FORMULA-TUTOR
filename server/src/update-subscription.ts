/// <reference types="node" />

import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

async function updateSubscription(
    userId: string,
    email: string,
    planId: string,
    planName: string,
    durationDays: number
) {
    console.log(`\n🔧 Updating subscription for user: ${email}\n`);

    try {
        const now = new Date();
        const endDate = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

        console.log(`Setting subscription:`);
        console.log(`  Plan: ${planName}`);
        console.log(`  Duration: ${durationDays} days`);
        console.log(`  Start: ${now.toISOString()}`);
        console.log(`  End: ${endDate.toISOString()}\n`);

        // First, get the most recent subscription
        const { data: existingSubs, error: fetchError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (fetchError) {
            console.error('❌ Failed to fetch subscriptions:', fetchError);
            return;
        }

        console.log(`Found ${existingSubs?.length || 0} existing subscriptions`);

        // Update the most recent one or create new if none exist
        if (existingSubs && existingSubs.length > 0) {
            const latestSub = existingSubs[0];
            console.log(`Updating subscription ID: ${latestSub.id}`);

            const { error: subError } = await supabase
                .from('subscriptions')
                .update({
                    plan_id: planId,
                    plan_name: planName,
                    status: 'active',
                    current_start: now.toISOString(),
                    current_end: endDate.toISOString(),
                    updated_at: now.toISOString()
                })
                .eq('id', latestSub.id);

            if (subError) {
                console.error('❌ Failed to update subscription:', subError);
                return;
            }
            console.log('✅ Subscription record updated');
        } else {
            // Create new subscription if none exist
            const { error: createError } = await supabase
                .from('subscriptions')
                .insert({
                    user_id: userId,
                    razorpay_subscription_id: null,
                    plan_id: planId,
                    plan_name: planName,
                    status: 'active',
                    current_start: now.toISOString(),
                    current_end: endDate.toISOString(),
                    amount: 900,
                    currency: 'INR'
                });

            if (createError) {
                console.error('❌ Failed to create subscription:', createError);
                return;
            }
            console.log('✅ New subscription record created');
        }

        // Update user status
        const { error: updateError } = await supabase
            .from('users')
            .update({
                subscription_status: 'active',
                updated_at: now.toISOString()
            })
            .eq('id', userId);

        if (updateError) {
            console.error('❌ Failed to update user:', updateError);
            return;
        }
        console.log('✅ User status updated to ACTIVE');

        console.log('\n✨ Subscription updated successfully!');
        console.log(`   User: ${email}`);
        console.log(`   Plan: ${planName}`);
        console.log(`   Ends: ${endDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
        if (error.stack) console.error(error.stack);
    }
}

// Main
const userId = 'f4c1c6e2-a3c2-49d2-a049-da6581dde2fb';
const email = 'www.shivansh065@gmail.com';
const planId = 'semiannual';
const planName = 'Semi-Annual Plan';
const durationDays = 180; // 6 months

updateSubscription(userId, email, planId, planName, durationDays).catch(console.error);
