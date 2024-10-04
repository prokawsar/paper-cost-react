import { User } from '@supabase/supabase-js'

export default function About({ user }: { user: User | null }) {
  return (
    <div className="flex flex-col text-center items-center bg-white">
      <img className="h-10 w-10 rounded-full" src="/logo.jpeg" alt="logo" />
      <p className="text-lg font-bold">Paper Cost</p>
      <p className="text-sm">
        Logged in as: <span className="text-yellow-600">{user?.email}</span>
      </p>
      <p className="mt-5">Developed by</p>
      <div className="text-sm flex flex-col">
        <p>Sheba Queue</p>
        <p>Kawsar Ahmed</p>
        <p className="text-[13px]">+880 1915983757</p>
      </div>
      <p className="mt-10 text-slate-500 text-xs">Version: </p>
    </div>
  )
}
