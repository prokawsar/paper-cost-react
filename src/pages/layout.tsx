import GlobalLoader from "@components/GlobalLoader";
import Footer from "@components/Footer";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col h-[92%] items-center">
        <nav className="max-w-6xl mx-auto w-full gap-2 flex flex-col">
          <p className="brand-name text-center text-[26px] text-transparent font-bold tracking-wide">
            Molla Printing & Packaging
          </p>
          <div className="bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]" />
        </nav>
        {children}
      </div>
      <GlobalLoader />
      <Toaster richColors position="bottom-right" closeButton />
      <Footer />
    </main>
  );
}
