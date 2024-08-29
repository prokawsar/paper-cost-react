import { Icon } from "@iconify/react";
import { useState } from "react";
import Modal from "./Modal";
import About from "./About";
import { useUserStore } from "@/store/index";
import { supabase } from "@/db/supabase";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

export default function Footer() {
  const [showSettings, setSettings] = useState(false);
  const [showAbout, setAbout] = useState(false);
  const { userData, setUser } = useUserStore();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <footer
      className={` max-w-6xl mx-auto w-full flex flex-row h-11 px-5 bg-slate-50 border-t border-teal-500 rounded-t-lg items-center 
      justify-${userData ? "between" : "center"} ${showSettings && "relative"}`}
    >
      {!userData ? (
        <AuthButton />
      ) : (
        <>
          <Link to="/" className="flex flex-row items-center gap-1">
            <Icon icon="clarity:home-line" /> Home
          </Link>
          <Link to="/history" className="flex flex-row items-center gap-1">
            <Icon icon="ph:read-cv-logo-light" /> Cost History
          </Link>
          <button
            onClick={() => setSettings(!showSettings)}
            className="flex flex-row gap-1 items-center"
          >
            <Icon icon="solar:settings-linear" /> Settings
          </button>
        </>
      )}
      {showSettings && (
        <div className="absolute w-20 right-3 bottom-11 flex flex-col items-start divide-y divide-orange-400 gap-1 bg-slate-50 p-2 rounded">
          <button
            onClick={() => {
              setSettings(false);
              setAbout(!showAbout);
            }}
          >
            About
          </button>
          <button
            onClick={() => {
              setSettings(false);
              signOut();
            }}
          >
            Logout
          </button>
        </div>
      )}
      {showAbout && (
        <Modal onClickBackdrop={() => setAbout(false)}>
          <About />
        </Modal>
      )}
    </footer>
  );
}
