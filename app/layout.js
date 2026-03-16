import './globals.css'

export const metadata = {
  title: 'College Resource Hub - Share & Discover Study Materials',
  description: 'A collaborative platform for college students to share and discover study resources, notes, and materials.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
