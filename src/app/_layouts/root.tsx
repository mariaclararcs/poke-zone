export default function Layout({
  children,
}: {
  children: React.ReactNode
  pageTitle?: string
}) {
  return (
    <div className={`min-h-screen flex flex-col`}>
        <main className="px-4 pb-4 h-full w-[100%]">
          {children}
        </main>
    </div>
  )
}