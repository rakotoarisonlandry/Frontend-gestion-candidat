import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0f]/90 border-b border-[#8c03e8]/20 shadow-lg shadow-[#8c03e8]/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#8c03e8] to-[#b94fff] flex items-center justify-center shadow-lg shadow-[#8c03e8]/40">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L14 6V10L8 14L2 10V6L8 2Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight text-sm">
            RecrutPro
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/candidates"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium tracking-wide"
          >
            Candidats
          </Link>
          <Link
            to="/create"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium tracking-wide"
          >
            Créer
          </Link>

          <div className="w-px h-5 bg-white/10 mx-2" />

          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-[#b94fff] hover:text-white hover:bg-[#8c03e8]/20 rounded-lg transition-all duration-200 border border-[#8c03e8]/30 hover:border-[#8c03e8]/60"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
