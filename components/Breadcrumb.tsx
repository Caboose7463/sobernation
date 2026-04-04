import Link from 'next/link'
import type { BreadcrumbItem } from '../lib/seo'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  schema?: object
}

export default function Breadcrumb({ items, schema }: BreadcrumbProps) {
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav aria-label="Breadcrumb" className="breadcrumb">
        {items.map((item, i) => (
          <span key={item.href} className="breadcrumb__item">
            {i < items.length - 1 ? (
              <>
                <Link href={item.href} className="breadcrumb__link">{item.name}</Link>
                <span className="breadcrumb__sep" aria-hidden="true">›</span>
              </>
            ) : (
              <span className="breadcrumb__current" aria-current="page">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
