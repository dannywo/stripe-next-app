'use client'

import { supabase } from "@/utils/supabaseClient";
import { useState } from "react"

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const randomEmail = `${Math.random()
      .toString(36)
      .substring(7)}@example.com`;
    const password = 'Password42069';

    const { data, error } = await supabase.auth.signUp({
      email: randomEmail,
      password,
    })

    if (error) {
      console.log(error);
    } else {
      console.log('User created and logged in: ', data)
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleSignUp}
      disabled={loading}>
      {loading ? 'Signing up...' : 'Sign up with random email and password'}
    </button>
  )
}