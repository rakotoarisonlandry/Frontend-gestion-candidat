import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/clients";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { extractApiError, extractApiSuccess } from "../utils/Apierror";
import jsPDF from "jspdf";

export default function Detail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("Candidat en attente de validation");
  const { data, isLoading } = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () => {
      const res = await api.get(`/candidates/${id}`);
      return res.data;
    },
  });
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Détails du candidat", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nom : ${data?.name}`, 20, 40);
    doc.text(`Email : ${data?.email}`, 20, 50);
    doc.text(`ID : ${id}`, 20, 60);

    doc.text(`Statut : ${status}`, 20, 70);
    doc.setTextColor(100, 0, 200);
    doc.setFont("helvetica", "bold");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
    doc.save(`candidat-${data?.name}.pdf`);
  };

  const validateMutation = useMutation({
    mutationFn: () => api.post(`/candidates/${id}/validate`),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["candidate", id] });
      setSuccessMsg(extractApiSuccess(res, "Candidat validé avec succès."));
      setErrorMsg("");
      setTimeout(() => setSuccessMsg(""), 3500);
      setStatus("Candidat validé");
    },
    onError: (err) => {
      setErrorMsg(extractApiError(err));
      setSuccessMsg("");
      setTimeout(() => setErrorMsg(""), 4000);
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#8c03e8]/6 rounded-full blur-[150px]" />
      </div>

      <main className="relative max-w-2xl mx-auto px-6 py-10">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/candidates"
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            Détails du candidat
          </h1>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mb-5 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
            <svg
              className="w-5 h-5 text-emerald-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-emerald-400 text-sm font-medium">{successMsg}</p>
          </div>
        )}
        {errorMsg && (
          <div className="mb-5 flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <svg
              className="w-5 h-5 text-red-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#8c03e8]/30 border-t-[#8c03e8] rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm">Chargement du profil…</p>
          </div>
        ) : (
          <div className="bg-[#111118] border border-white/8 rounded-3xl p-8 shadow-2xl">
            {/* Avatar & Identité */}
            <div className="absolute right-5 top-5">
              <button
                onClick={downloadPDF}
                className="mt-4 w-full flex items-center cursor-grab justify-center gap-2 border border-white/10 hover:bg-white/10 text-white font-semibold py-3 px-3 rounded-2xl transition-all"
              >
                Télécharger en PDF
              </button>
            </div>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#8c03e8]/40 to-[#b94fff]/20 border border-[#8c03e8]/30 flex items-center justify-center text-[#b94fff] font-bold text-3xl mb-4">
                {data?.name?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
              <h2 className="text-2xl font-bold text-white">{data?.name}</h2>
              <p className="text-zinc-400 mt-1">{data?.email}</p>
            </div>

            {/* Infos supplémentaires si besoin */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">
                  ID Candidat
                </p>
                <p className="text-zinc-200 font-mono text-sm">{id}</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => validateMutation.mutate()}
              disabled={validateMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#8c03e8] to-[#a020f0] hover:from-[#9d15f5] hover:to-[#b94fff] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#8c03e8]/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {validateMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Traitement...
                </>
              ) : (
                "Valider le candidat"
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
