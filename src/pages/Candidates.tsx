import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/clients";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { extractApiError, extractApiSuccess } from "../utils/Apierror";

export default function Candidates() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const res = await api.get("/candidates");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/candidates/${id}`),
    onMutate: (id) => setDeletingId(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      setSuccessMsg(extractApiSuccess(res, "Candidat supprimé avec succès."));
      setErrorMsg("");
      setTimeout(() => setSuccessMsg(""), 3500);
    },
    onError: (err) => {
      setErrorMsg(extractApiError(err));
      setSuccessMsg("");
      setTimeout(() => setErrorMsg(""), 4000);
    },
    onSettled: () => setDeletingId(null),
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#8c03e8]/6 rounded-full blur-[150px]" />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Candidats</h1>
            <p className="text-zinc-500 text-sm mt-1">
              {data?.length ?? 0} candidat{data?.length !== 1 ? "s" : ""} enregistré{data?.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-linear-to-r from-[#8c03e8] to-[#a020f0] hover:from-[#9d15f5] hover:to-[#b94fff] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#8c03e8]/30 hover:shadow-[#8c03e8]/50 active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nouveau candidat
          </Link>
        </div>

        {successMsg && (
          <div className="mb-5 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-emerald-400 text-sm font-medium">{successMsg}</p>
          </div>
        )}
        {errorMsg && (
          <div className="mb-5 flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#8c03e8]/30 border-t-[#8c03e8] rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm">Chargement des candidats…</p>
          </div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-[#8c03e8]/10 border border-[#8c03e8]/20 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8c03e8" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p className="text-white font-semibold">Aucun candidat pour l'instant</p>
            <p className="text-zinc-500 text-sm mt-1">Commencez par créer votre premier candidat.</p>
          </div>
        )}

        {!isLoading && data?.length > 0 && (
          <div className="grid gap-3">
            {data.map((c: any, i: number) => (
              <div
                key={c._id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group bg-[#111118] border border-white/8 hover:border-[#8c03e8]/40 rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 hover:bg-[#8c03e8]/5 hover:shadow-lg hover:shadow-[#8c03e8]/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#8c03e8]/40 to-[#b94fff]/20 border border-[#8c03e8]/30 flex items-center justify-center text-[#b94fff] font-bold text-sm">
                    {c.name?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{c.name}</p>
                    {c.email && <p className="text-zinc-500 text-xs mt-0.5">{c.email}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                  <Link to={`/detail/${c._id}`} className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-150">
                    Voir
                  </Link>
                  <Link to={`/edit/${c._id}`} className="px-3 py-1.5 text-xs font-medium text-[#b94fff] hover:text-white bg-[#8c03e8]/10 hover:bg-[#8c03e8]/25 rounded-lg transition-all duration-150">
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(c._id)}
                    disabled={deletingId === c._id}
                    className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/25 rounded-lg transition-all duration-150 disabled:opacity-40"
                  >
                    {deletingId === c._id ? (
                      <span className="flex items-center gap-1">
                        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        …
                      </span>
                    ) : "Supprimer"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}