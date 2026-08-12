// Root layout — a Server Component. Imports the library's compiled CSS once and
// injects the no-flash theme script from the server-safe ./no-flash subpath
// (proves both are SSR-safe in an RSC tree).
import type { ReactNode } from 'react'
import { noFlashScript } from '@orionshub/lucent/no-flash'
import '@orionshub/lucent/styles.css'

export const metadata = {
  title: 'Lucent — Next.js smoke',
  description: 'DOCS-03 App Router smoke build',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
