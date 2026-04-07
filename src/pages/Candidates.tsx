import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/clients";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Candidates() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const res = await api.get("/candidates");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/candidates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h2>Liste des candidats</h2>

      {data?.map((c: any) => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: 5 }}>
          <p>{c.name}</p>

          <Link to={`/detail/${c._id}`}>Voir</Link> |{" "}
          <Link to={`/edit/${c._id}`}>Modifier</Link> |{" "}
          <button  onClick={() => deleteMutation.mutate(c._id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}