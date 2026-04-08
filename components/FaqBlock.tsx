'use client'
import { useState } from 'react'
import type { FaqItem } from '../lib/seo'

interface FaqBlockProps {
  faqs: FaqItem[]
  // schema prop intentionally removed — parent page emits the FAQPage JSON-LD
  // in its own <script> tag; passing it here caused duplicate FAQPage errors in GSC
}

export default function FaqBlock({ faqs }: FaqBlockProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <div className="faq-block">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item${open === i ? ' faq-item--open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.question}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {open === i && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
