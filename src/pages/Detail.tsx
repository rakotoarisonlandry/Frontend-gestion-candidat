import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../api/clients";
import Navbar from "../components/Navbar";

export default function Detail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () => {
      const res = await api.get(`/candidates/${id}`);
      return res.data;
    },
  });

  const validateMutation = useMutation({
    mutationFn: () => api.post(`/candidates/${id}/validate`),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      <h2>Détail</h2>

      <p>Nom: {data.name}</p>
      <p>Email: {data.email}</p>

      <button onClick={() => validateMutation.mutate()}>
        {validateMutation.isPending ? "Validation..." : "Valider"}
      </button>
    </div>
  );
}