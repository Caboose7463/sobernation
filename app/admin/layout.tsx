import type { Metadata } from 'next'

// Admin panel must never be indexed by search engines
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Admin | SoberNation',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
