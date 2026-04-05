import { createClient } from '@supabase/supabase-js'

// Admin client using service role — bypasses RLS for seeding and admin actions
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
