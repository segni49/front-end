import '../app/globals.css';

export const metadata = {
  title: 'Potato Leaf Classifier',
  description: 'Mobile-first leaf disease triage for students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-brand-50 to-accent-50">
        {children}
      </body>
    </html>
  )
}