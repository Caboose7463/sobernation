'use client'

/**
 * Hidden fields for lib/form-guard.ts: a honeypot input people never see and
 * a "t" input holding the time the form was rendered. Put inside a <form> and
 * read both with new FormData(form).
 */
import { useEffect, useRef } from 'react'

export default function SpamGuardFields({ honeypotName = 'website' }: { honeypotName?: string }) {
  const tRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (tRef.current) tRef.current.value = String(Date.now())
  }, [])
  return (
    <>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Leave this empty
          <input type="text" name={honeypotName} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="t" ref={tRef} defaultValue="" />
    </>
  )
}

/** Reads the honeypot and "t" values from a form, ready to merge into a JSON body. */
export function spamGuardValues(form: HTMLFormElement, honeypotName = 'website'): Record<string, string> {
  const fd = new FormData(form)
  return { [honeypotName]: String(fd.get(honeypotName) ?? ''), t: String(fd.get('t') ?? '') }
}
