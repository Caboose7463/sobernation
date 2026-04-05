'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

const SUBSTANCES = [
  'Alcohol', 'Cocaine', 'Heroin', 'Cannabis', 'MDMA / Ecstasy',
  'Amphetamine', 'Ketamine', 'Crack cocaine', 'Prescription opioids',
  'Benzodiazepines', 'Prescription drugs', 'Alcohol & cocaine',
  'Heroin & alcohol', 'Multiple substances', 'Other',
]

type Step = 'form' | 'success'

export default function ShareStoryPage() {
  const [step, setStep] = useState<Step>('form')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '',
    location: '',
    substance: '',
    daysSober: '',
    story: '',
  })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setError('')
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }

    // Preview
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/stories/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload failed')
      setUploadedUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Please enter your first name')
    if (!form.location.trim()) return setError('Please enter your location')
    if (!form.substance) return setError('Please select a substance')
    if (!form.daysSober || parseInt(form.daysSober) < 1) return setError('Please enter how many days sober you are')
    if (!form.story.trim() || form.story.trim().length < 50) return setError('Your story must be at least 50 characters')

    setSubmitting(true)
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          location: form.location.trim(),
          substance: form.substance,
          daysSober: parseInt(form.daysSober),
          story: form.story.trim(),
          imageUrl: uploadedUrl,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')
      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong, please try again')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💚</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Thank you for sharing</h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>
            Your story has been submitted and will be reviewed before it appears on the site. This usually takes 24–48 hours. Your words could be exactly what someone else needs to hear today.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sober-stories" style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Read other stories
            </Link>
            <Link href="/" style={{ padding: '10px 20px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <Link href="/sober-stories" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            ← All stories
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <div className="label" style={{ marginBottom: 10 }}>Your story matters</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Share your recovery journey
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Your experience — whatever stage you're at — could give someone else the hope they need. All stories are reviewed before publication. You can be as anonymous as you like.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Photo upload */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
              Your photo <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional)</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${imagePreview ? 'var(--accent)' : 'var(--border-mid)'}`,
                borderRadius: 'var(--radius-md)',
                padding: imagePreview ? 0 : '28px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: imagePreview ? 'transparent' : 'var(--white)',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
              ) : (
                <>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{uploading ? '⏳' : '📷'}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {uploading ? 'Uploading…' : 'Click to upload a photo (max 5MB)'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 4 }}>
                    If you skip this, we'll use your initials instead
                  </div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            {imagePreview && (
              <button type="button" onClick={() => { setImagePreview(null); setUploadedUrl(null); if (fileRef.current) fileRef.current.value = '' }}
                style={{ marginTop: 6, fontSize: 12, color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Remove photo
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="story-name" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
              First name (or a name you're comfortable using)
            </label>
            <input
              id="story-name"
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Sarah, or just S."
              maxLength={50}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, color: 'var(--text)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="story-location" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
              Your town or city
            </label>
            <input
              id="story-location"
              type="text"
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="e.g. Manchester"
              maxLength={80}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, color: 'var(--text)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Substance */}
          <div>
            <label htmlFor="story-substance" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
              What were you recovering from?
            </label>
            <select
              id="story-substance"
              value={form.substance}
              onChange={e => set('substance', e.target.value)}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, color: form.substance ? 'var(--text)' : 'var(--text-muted)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box' }}
            >
              <option value="">Select…</option>
              {SUBSTANCES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Days sober */}
          <div>
            <label htmlFor="story-days" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
              How many days sober are you today?
            </label>
            <input
              id="story-days"
              type="number"
              value={form.daysSober}
              onChange={e => set('daysSober', e.target.value)}
              placeholder="e.g. 365"
              min={1}
              max={36500}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, color: 'var(--text)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 4 }}>
              Not sure? Use our <Link href="/sobriety-counter" style={{ color: 'var(--accent)' }}>sobriety calculator</Link>
            </div>
          </div>

          {/* Story */}
          <div>
            <label htmlFor="story-text" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
              Your story
            </label>
            <textarea
              id="story-text"
              value={form.story}
              onChange={e => set('story', e.target.value)}
              placeholder="Tell us what happened, how you got help, and where you are now. There are no rules — just be honest."
              rows={10}
              maxLength={5000}
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, color: 'var(--text)', background: 'var(--white)', outline: 'none', resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
            <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 4, textAlign: 'right' }}>
              {form.story.length} / 5000
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            By submitting, you confirm this is your own story and you consent to it being published on SoberNation. We review all stories before publication. We may lightly edit for length and clarity. We never share your details with third parties.
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '12px 14px', fontSize: 13, color: '#c0392b' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || uploading}
            style={{
              padding: '14px 28px', background: submitting ? 'var(--text-muted)' : 'var(--accent)',
              color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
              fontWeight: 700, fontSize: 15, cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {submitting ? 'Submitting…' : 'Submit your story'}
          </button>
        </form>
      </div>
    </div>
  )
}
