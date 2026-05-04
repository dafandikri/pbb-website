import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export const hasSupabaseConfig =
  supabaseUrl.length > 0 && supabaseKey.length > 0

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseKey)
  : null
