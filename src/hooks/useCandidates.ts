import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { candidateService } from "../services/candidateService";
import { extractApiError, extractApiSuccess } from "../utils/Apierror";

const PAGE_SIZE = 4;

export function useCandidates() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["candidates"],
    queryFn: candidateService.getAll,
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const deleteMutation = useMutation({
    mutationFn: candidateService.delete,
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

  return {
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
    deleteCandidate: deleteMutation.mutate,
    filteredCount: filtered.length,
  };
}
