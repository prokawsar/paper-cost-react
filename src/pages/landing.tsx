import AuthButton from '@/components/AuthButton'

export default function Landing() {
  document.title = 'Paper Cost'

  return (
    <div className="flex flex-col h-full items-center bg-gray-100 text-gray-800 px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl uppercase font-bold text-yellow-600">
          Paper Cost Calculator
        </h1>
        <p className="text-xl mt-2">
          Your go-to app for accurate paper cost estimation for carton boxes.
        </p>
      </header>

      <main className="flex flex-col items-center space-y-6">
        <img
          src="/assets/home.png"
          alt="App Preview"
          className="rounded-lg shadow-md w-[80%]"
        />

        <section className="text-center">
          <h2 className="text-xl font-semibold">Calculate Costs with Ease</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Simply enter your paper dimensions, quantity, and specifications,
            and get instant cost estimates.
          </p>
        </section>

        <section className="bg-slate-50 p-4 rounded-lg shadow-md w-full max-w-sm text-center">
          <h3 className="font-semibold">Why Use Our Calculator?</h3>
          <ul className="text-sm text-gray-700 list-disc list-inside mt-2">
            <li>Quick and accurate results</li>
            <li>Easy to use for factory owners and workers</li>
            <li>Saves time</li>
            <li>Saves pricing history</li>
          </ul>
        </section>

        <AuthButton />
      </main>
    </div>
  )
}
