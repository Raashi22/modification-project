import './globals.css'

export const metadata = {
  title: 'Data Structures Visualizer',
  description: 'Interactive visualization of various data structures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
