export const metadata = {
  title: 'DRAKON Admin',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface min-h-screen" dir="ltr">
      {children}
    </div>
  )
}
