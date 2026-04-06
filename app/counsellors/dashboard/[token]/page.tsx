import { redirect } from 'next/navigation'

// Old token-based dashboard — permanently redirected to new Supabase Auth dashboard
export default function TokenDashboardRedirect() {
  redirect('/dashboard')
}
