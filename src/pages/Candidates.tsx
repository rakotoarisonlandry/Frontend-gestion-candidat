import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCandidates } from "../hooks/useCandidates";

export default function Candidates() {
  const {
    data,
    isLoading,
    paginated,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    deletingId,
    successMsg,
    errorMsg,
    deleteCandidate,
    filteredCount,
  } = useCandidates();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#8c03e8]/6 rounded-full blur-[150px]" />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Candidats
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {data?.length ?? 0} candidat{data?.length !== 1 ? "s" : ""}{" "}
              enregistré{data?.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-linear-to-r from-[#8c03e8] to-[#a020f0] hover:from-[#9d15f5] hover:to-[#b94fff] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#8c03e8]/30 active:scale-[0.98]"
          >
            <PlusIcon /> Nouveau candidat
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon />
          <input
            type="text"
            placeholder="Rechercher par nom ou email…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-[#111118] border border-white/8 focus:border-[#8c03e8]/50 rounded-xl pl-11 pr-10 py-3 text-sm text-white outline-none transition-all"
          />
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {successMsg && <Alert variant="success" message={successMsg} />}
        {errorMsg && <Alert variant="error" message={errorMsg} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : paginated.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <>
            <div className="grid gap-3">
              {paginated.map((c, i) => (
                <CandidateCard
                  key={c._id}
                  candidate={c}
                  index={i}
                  isDeleting={deletingId === c._id}
                  onDelete={() => deleteCandidate(c._id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                search={search}
                filteredCount={filteredCount}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

const Alert = ({
  variant,
  message,
}: {
  variant: "success" | "error";
  message: string;
}) => (
  <div
    className={`mb-5 flex items-center gap-3 border rounded-xl px-4 py-3 ${variant === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
  >
    <p className="text-sm font-medium">{message}</p>
  </div>
);

const CandidateCard = ({ candidate, index, isDeleting, onDelete }: any) => (
  <div
    style={{ animationDelay: `${index * 60}ms` }}
    className="group bg-[#111118] border border-white/8 hover:border-[#8c03e8]/40 rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 hover:bg-[#8c03e8]/5"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#8c03e8]/40 to-[#b94fff]/20 border border-[#8c03e8]/30 flex items-center justify-center text-[#b94fff] font-bold text-sm">
        {candidate.name?.charAt(0)?.toUpperCase() ?? "?"}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{candidate.name}</p>
        {candidate.email && (
          <p className="text-zinc-500 text-xs mt-0.5">{candidate.email}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
      <Link
        to={`/detail/${candidate._id}`}
        className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 rounded-lg"
      >
        Voir
      </Link>
      <Link
        to={`/edit/${candidate._id}`}
        className="px-3 py-1.5 text-xs font-medium text-[#b94fff] bg-[#8c03e8]/10 rounded-lg"
      >
        Modifier
      </Link>
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 rounded-lg disabled:opacity-40"
      >
        {isDeleting ? "..." : "Supprimer"}
      </button>
    </div>
  </div>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const SearchIcon = () => (
  <svg
    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-10 h-10 border-2 border-[#8c03e8]/30 border-t-[#8c03e8] rounded-full animate-spin" />
    <p className="text-zinc-500 text-sm">Chargement...</p>
  </div>
);
const EmptyState = ({ search }: { search: string }) => (
  <div className="text-center py-24">
    <p className="text-white font-semibold">
      {search ? `Aucun résultat pour "${search}"` : "Aucun candidat"}
    </p>
  </div>
);

const Pagination = ({ page, totalPages, setPage }: any) => (
  <div className="flex items-center justify-between mt-8">
    <p className="text-zinc-600 text-xs">
      Page {page} sur {totalPages}
    </p>
    <div className="flex items-center gap-1">
      <button
        onClick={() => setPage((p: number) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="p-2 text-zinc-500 disabled:opacity-30"
      >
        {"<"}
      </button>
      <button
        onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="p-2 text-zinc-500 disabled:opacity-30"
      >
        {">"}
      </button>
    </div>
  </div>
);
