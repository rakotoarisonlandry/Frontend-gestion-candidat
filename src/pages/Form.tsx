import { useForm } from "react-hook-form";
import { api } from "../api/clients";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { extractApiError, extractApiSuccess } from "../utils/Apierror";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/candidates/${id}`)
        .then((res) => {
          setValue("name", res.data.name);
          setValue("email", res.data.email);
        })
        .catch((err) => setErrorMsg(extractApiError(err, "Impossible de charger les données du candidat.")));
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      if (id) {
        const res = await api.put(`/candidates/${id}`, data);
        setSuccessMsg(extractApiSuccess(res, "Candidat mis à jour avec succès."));
      } else {
        const res = await api.post("/candidates", data);
        setSuccessMsg(extractApiSuccess(res, "Candidat créé avec succès."));
      }

      setTimeout(() => navigate("/candidates"), 1200);
    } catch (err) {
      setErrorMsg(extractApiError(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-[125 bg-[#8c03e8]/7 rounded-full blur-[130px]" />
      </div>

      <main className="relative max-w-lg mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/candidates")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux candidats
        </button>

        <div className="bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black/60">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#8c03e8] to-[#b94fff] shadow-lg shadow-[#8c03e8]/40 mb-4">
              {id ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {id ? "Modifier le candidat" : "Nouveau candidat"}
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {id ? "Mettez à jour les informations du candidat." : "Renseignez les informations du nouveau candidat."}
            </p>
          </div>

          {successMsg && (
            <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-emerald-400 text-sm font-medium">{successMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 tracking-widest uppercase">
                Nom complet
              </label>
              <input
                {...register("name")}
                placeholder="Jean Dupont"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#8c03e8]/60 focus:bg-[#8c03e8]/5 focus:ring-2 focus:ring-[#8c03e8]/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 tracking-widest uppercase">
                Adresse e-mail
              </label>
              <input
                {...register("email")}
                placeholder="jean@exemple.com"
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#8c03e8]/60 focus:bg-[#8c03e8]/5 focus:ring-2 focus:ring-[#8c03e8]/20 transition-all duration-200"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/candidates")}
                className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-linear-to-r from-[#8c03e8] to-[#a020f0] hover:from-[#9d15f5] hover:to-[#b94fff] text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#8c03e8]/30 hover:shadow-[#8c03e8]/50 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Enregistrement…
                  </span>
                ) : id ? "Mettre à jour" : "Créer le candidat"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}