'use client'
import { useState } from 'react'
import type { FaqItem } from '../lib/seo'

interface FaqBlockProps {
  faqs: FaqItem[]
  schema?: object  // pre-generated FAQ JSON-LD to inject
}

export default function FaqBlock({ faqs, schema }: FaqBlockProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
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
