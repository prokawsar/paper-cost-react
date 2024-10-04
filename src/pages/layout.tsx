import GlobalLoader from '@/components/GlobalLoader'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from '@/components/Loader'

export function Layout() {
  const { state } = useNavigation()

  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col h-[92%] items-center">
        <nav className="max-w-6xl mx-auto w-full gap-2 flex flex-col">
          <p className="brand-name text-center text-[26px] text-transparent font-bold tracking-wide">
            Molla Printing & Packaging
          </p>
          <div className="bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]" />
        </nav>
        {/* {children} */}
        {state == 'loading' ? <Loader /> : <Outlet />}
      </div>
      <GlobalLoader />
      <Toaster
        toastOptions={{
          className: 'py-2.5 mb-7',
          closeButton: true,
        }}
        position="bottom-center"
        richColors
      />
      <Footer />
    </main>
  )
}
