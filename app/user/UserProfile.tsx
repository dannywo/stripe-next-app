'use client'

import { supabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react"

export default function UserProfile() {

  const [user, setUser] = useState<User | null>(null);
  const [stripeCustomer, setStripeCustomer] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: stripeCustomerData, error } = await supabase
          .from('stripe_customers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.log('No Stripe customer data found.',)
        } else {
          setStripeCustomer(stripeCustomerData);
        }
      }
    }
  })

  return (
    <div></div>
  )
}