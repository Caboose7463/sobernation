import { redirect } from 'next/navigation'

// Old claim flow — permanently redirected to new verification portal
export default function ClaimRedirect() {
  redirect('/verify/onboard')
}
