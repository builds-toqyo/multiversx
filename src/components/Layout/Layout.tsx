import type { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex flex-grow items-stretch justify-center py-6 px-3">
        {children}
      </main>
      <Footer />
    </div>
  )
}
