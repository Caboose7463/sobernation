
const fs = require('fs')

const file = 'app/therapist/[slug]/page.tsx'
let content = fs.readFileSync(file, 'utf8')

// Wrap entire function body in try-catch at the server level
// so the real error message is visible in the rendered output
const BEFORE = `export default async function TherapistPage({ params }: Props) {`
const AFTER = `export default async function TherapistPage({ params }: Props) {
  try {`

const CLOSE_BEFORE = `}\n`  // last line
// We need to add the catch block before the final closing brace

// Insert try { after function declaration
content = content.replace(BEFORE, AFTER)

// Add catch block before the final closing brace of the file
// Find the last line which is just "}\n" at the very end
const lastBrace = content.lastIndexOf('\n}\n')
const catchBlock = `
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? (err.stack ?? '') : ''
    console.error('[TherapistPage] CRASH slug=' + (await params).slug, msg, stack)
    return (
      <div style={{ padding: 40, fontFamily: 'monospace', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#dc2626', fontSize: 20 }}>Server Error (Debug)</h1>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>This message is only visible in debug builds.</p>
        <pre style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 20, whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 13 }}>{msg}</pre>
        <pre style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 11, marginTop: 16 }}>{stack}</pre>
      </div>
    )
  }`

content = content.slice(0, lastBrace) + catchBlock + content.slice(lastBrace)

fs.writeFileSync(file, content, 'utf8')
console.log('Done — try-catch wrapper added')
