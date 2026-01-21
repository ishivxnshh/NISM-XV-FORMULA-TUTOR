
/// <reference types="node" />

import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || '';
// Use SERVICE_KEY for admin privileges
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Helper function to convert Unix timestamp to IST
function unixToIST(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    return istDate.toISOString();
}

async function searchRazorpaySubscriptions(email: string) {
    console.log(`\n🔍 Searching Razorpay for subscriptions with email: ${email}\n`);

    try {
        // Search subscriptions in Razorpay
        const subscriptions = await razorpay.subscriptions.all({ count: 100 });
        
        console.log(`Found ${subscriptions.items.length} total subscriptions in Razorpay`);
        
        // Filter by notes containing the email
        const matchingSubscriptions = subscriptions.items.filter((sub: any) => {
            return sub.notes && JSON.stringify(sub.notes).toLowerCase().includes(email.toLowerCase());
        });

        console.log(`\nMatching subscriptions for ${email}: ${matchingSubscriptions.length}\n`);
        
        matchingSubscriptions.forEach((sub: any, idx: number) => {
            console.log(`[${idx + 1}] Subscription ID: ${sub.id}`);
            console.log(`    Status: ${sub.status}`);
            console.log(`    Plan ID: ${sub.plan_id}`);
            console.log(`    Customer ID: ${sub.customer_id}`);
            console.log(`    Amount: ₹${(sub.notes?.plan_name || 'Unknown')}`);
            if (sub.current_start) console.log(`    Start: ${new Date(sub.current_start * 1000).toLocaleString('en-IN')}`);
            if (sub.current_end) console.log(`    End: ${new Date(sub.current_end * 1000).toLocaleString('en-IN')}`);
            console.log(`    Paid Count: ${sub.paid_count}/${sub.total_count}`);
            console.log(`    Notes:`, sub.notes);
            console.log();
        });

        return matchingSubscriptions;
    } catch (error: any) {
        console.error('❌ Error searching Razorpay:', error.message);
        return [];
    }
}

async function manuallyActivateSubscription(
    userId: string, 
    email: string,
    razorpaySubscriptionId: string,
    planId: string = 'monthly',
    planName: string = '1 Month Plan',
    amount: number = 300
) {
    console.log(`\n🔧 Manually activating subscription for user: ${email}\n`);

    try {
        // 1. Fetch the Razorpay subscription
        console.log(`Fetching subscription from Razorpay: ${razorpaySubscriptionId}...`);
        const razorpaySub = await razorpay.subscriptions.fetch(razorpaySubscriptionId);
        
        console.log(`✅ Razorpay Status: ${razorpaySub.status}`);
        console.log(`   Customer ID: ${razorpaySub.customer_id}`);
        console.log(`   Paid Count: ${razorpaySub.paid_count}`);

        if (razorpaySub.status !== 'active' && razorpaySub.status !== 'authenticated' && razorpaySub.paid_count === 0) {
            console.error(`⚠️ Warning: Subscription status is '${razorpaySub.status}' with 0 payments. Proceeding anyway...`);
        }

        // 2. Check if user exists in public.users
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (!existingUser) {
            console.log('User not found in public.users. Creating user record...');
            
            // Check auth.users
            const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);
            
            if (authError || !authUser) {
                console.error('❌ User not found in auth.users either! Cannot proceed.');
                return;
            }

            // Create user in public.users
            const { error: createUserError } = await supabase
                .from('users')
                .insert({
                    id: userId,
                    email: email,
                    full_name: authUser.user.user_metadata?.full_name || authUser.user.email?.split('@')[0] || 'User',
                    avatar_url: authUser.user.user_metadata?.avatar_url || null,
                    subscription_status: 'inactive',
                    subscription_id: null,
                    razorpay_customer_id: null
                });

            if (createUserError) {
                console.error('❌ Failed to create user:', createUserError);
                return;
            }
            console.log('✅ User record created');
        } else {
            console.log('✅ User exists in public.users');
        }

        // 3. Create subscription record
        console.log('Creating subscription record...');
        
        const startDate = razorpaySub.current_start ? unixToIST(razorpaySub.current_start) : new Date().toISOString();
        const endDate = razorpaySub.current_end ? unixToIST(razorpaySub.current_end) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .insert({
                user_id: userId,
                razorpay_subscription_id: razorpaySubscriptionId,
                plan_id: planId,
                plan_name: planName,
                status: 'active',
                current_start: startDate,
                current_end: endDate,
                amount: amount,
                currency: 'INR'
            })
            .select()
            .single();

        if (subError) {
            console.error('❌ Failed to create subscription:', subError);
            return;
        }
        console.log('✅ Subscription record created');

        // 4. Update user status to active
        console.log('Updating user subscription status...');
        const { error: updateError } = await supabase
            .from('users')
            .update({
                subscription_status: 'active',
                subscription_id: razorpaySubscriptionId,
                razorpay_customer_id: razorpaySub.customer_id
            })
            .eq('id', userId);

        if (updateError) {
            console.error('❌ Failed to update user:', updateError);
            return;
        }
        console.log('✅ User status updated to ACTIVE');

        // 5. Record payment transaction if there were payments
        if (razorpaySub.paid_count > 0) {
            console.log('Recording payment transaction...');
            
            // Fetch the latest payment
            try {
                const payments = await razorpay.payments.all({ 
                    count: 10
                });

                // Find payment for this subscription
                const payment = payments.items.find((p: any) => 
                    p.notes?.subscription_id === razorpaySubscriptionId || 
                    p.description?.includes(razorpaySubscriptionId)
                );

                if (payment) {
                    await supabase
                        .from('payment_transactions')
                        .upsert({
                            user_id: userId,
                            subscription_id: subscription.id,
                            razorpay_payment_id: payment.id,
                            razorpay_order_id: payment.order_id || null,
                            amount: Number(payment.amount) / 100,
                            currency: payment.currency,
                            status: payment.status
                        }, { onConflict: 'razorpay_payment_id' });
                    
                    console.log('✅ Payment transaction recorded');
                } else {
                    console.log('⚠️ Could not find matching payment in Razorpay');
                }
            } catch (paymentError) {
                console.log('⚠️ Could not fetch payments:', paymentError);
            }
        }

        console.log('\n✨ Subscription activated successfully!');
        console.log(`   User: ${email}`);
        console.log(`   Plan: ${planName}`);
        console.log(`   Ends: ${new Date(endDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
        
    } catch (error: any) {
        console.error('❌ Error:', error.message);
        if (error.stack) console.error(error.stack);
    }
}

// Main
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
    console.log('Usage:');
    console.log('  npm run manual-activate search <email>                               - Search Razorpay for subscriptions');
    console.log('  npm run manual-activate activate <userId> <email> <razorpay_sub_id>  - Activate subscription manually\n');
    console.log('Example:');
    console.log('  npm run manual-activate search yogeshaggarwal@hotmail.com');
    console.log('  npm run manual-activate activate 4c4821b3-98ca-41dd-a047-fc25a895c90e yogeshaggarwal@hotmail.com sub_P1a2B3c4D5e6');
    process.exit(1);
}

if (command === 'search') {
    const email = args[1];
    if (!email) {
        console.error('❌ Email required');
        process.exit(1);
    }
    searchRazorpaySubscriptions(email).catch(console.error);
} else if (command === 'activate') {
    const userId = args[1];
    const email = args[2];
    const razorpaySubId = args[3];
    const planId = args[4] || 'monthly';
    const planName = args[5] || '1 Month Plan';
    const amount = args[6] ? parseFloat(args[6]) : 300;
    
    if (!userId || !email || !razorpaySubId) {
        console.error('❌ Usage: activate <userId> <email> <razorpay_subscription_id> [planId] [planName] [amount]');
        process.exit(1);
    }
    
    manuallyActivateSubscription(userId, email, razorpaySubId, planId, planName, amount).catch(console.error);
} else {
    console.error('Unknown command:', command);
    process.exit(1);
}
