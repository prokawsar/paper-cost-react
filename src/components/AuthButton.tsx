import { supabase } from "@/db/supabase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoadingStore, useUserStore } from "@/store/index";

export default function AuthButton() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setIsLoading } = useLoadingStore();
  const { userData, setUser } = useUserStore();

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
    navigate("/login");
  };

  if (userData?.id) {
    return (
      <div className="flex items-center gap-4">
        Hey, {userData.email}!<button onClick={signOut}>Logout</button>
      </div>
    );
  }

  const isHomeRoute = () => {
    const showHome = ["/login", "/signup"].includes(pathname);
    if (showHome) return ["/", "Home"];
    else return ["/login", "Login"];
  };

  return (
    <Link
      className="flex underline underline-offset-8 border-slate-500 px-3 py-2 hover:text-slate-600"
      to={isHomeRoute()[0]}
    >
      {isHomeRoute()[1]}
    </Link>
  );
}
