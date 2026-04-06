'use client'

/**
 * Temporary error boundary for /therapist/[slug]
 * Displays the actual error so we can identify the crash cause.
 * REMOVE after diagnosis is complete.
 */
export default function TherapistError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '60px 24px', maxWidth: 700, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#dc2626' }}>
        Page Error (Debug Mode)
      </h1>
      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Error message:</div>
        <pre style={{ fontSize: 13, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {error.message || '(no message)'}
        </pre>
        {error.digest && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>Digest: {error.digest}</div>
        )}
      </div>
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Stack trace:</div>
        <pre style={{ fontSize: 11, whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflow: 'auto', maxHeight: 300 }}>
          {error.stack || '(no stack)'}
        </pre>
      </div>
      <button
        onClick={reset}
        style={{ marginTop: 16, padding: '10px 20px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
      >
        Try again
      </button>
    </div>
  )
}
