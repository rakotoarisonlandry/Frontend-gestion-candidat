import { useForm } from "react-hook-form";
import { api } from "../api/clients";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (id) {
      api.get(`/candidates/${id}`).then((res) => {
        setValue("name", res.data.name);
        setValue("email", res.data.email);
      });
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    if (id) {
      await api.put(`/candidates/${id}`, data);
    } else {
      await api.post("/candidates", data);
    }

    navigate("/candidates");
  };

  return (
    <div>
      <Navbar />
      <h2>{id ? "Modifier" : "Créer"} candidat</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}