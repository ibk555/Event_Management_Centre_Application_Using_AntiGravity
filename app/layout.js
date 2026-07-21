import './globals.css'

export const metadata = {
  title: 'Event Center Booking System',
  description: 'Book your event center securely.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
