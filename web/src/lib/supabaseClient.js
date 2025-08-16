import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null
if (supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = client

