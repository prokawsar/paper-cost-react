import { Link, useLocation } from 'react-router-dom'

export default function AuthButton() {
  const { pathname } = useLocation()

  const isHomeRoute = () => {
    const showHome = ['/login', '/signup'].includes(pathname)
    if (showHome) return ['/', 'Home']
    else return ['/login', 'Get Started']
  }

  return (
    <Link
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
      to={isHomeRoute()[0]}
    >
      {isHomeRoute()[1]}
    </Link>
  )
}
