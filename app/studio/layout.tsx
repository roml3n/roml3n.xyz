export const metadata = {
  title: 'Sanity Studio - roml3n.xyz',
  description: 'Content management for roml3n.xyz',
}

export default function StudioLayout({
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
