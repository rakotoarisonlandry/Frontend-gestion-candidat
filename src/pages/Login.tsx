import { useState } from "react";
import { api } from "../api/clients";
import { useNavigate } from "react-router-dom";
import { extractApiError } from "../utils/Apierror";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/candidates");
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#8c03e8]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black/60">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-[#8c03e8] to-[#b94fff] shadow-lg shadow-[#8c03e8]/40 mb-4">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Connexion</h1>
            <p className="text-zinc-500 text-sm mt-1">Accédez à votre espace recrutement</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 tracking-widest uppercase">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#8c03e8]/60 focus:bg-[#8c03e8]/5 focus:ring-2 focus:ring-[#8c03e8]/20 transition-all duration-200"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 tracking-widest uppercase">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#8c03e8]/60 focus:bg-[#8c03e8]/5 focus:ring-2 focus:ring-[#8c03e8]/20 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full bg-linear-to-r from-[#8c03e8] to-[#a020f0] hover:from-[#9d15f5] hover:to-[#b94fff] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-[#8c03e8]/30 hover:shadow-[#8c03e8]/50 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Connexion en cours…
              </span>
            ) : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
}