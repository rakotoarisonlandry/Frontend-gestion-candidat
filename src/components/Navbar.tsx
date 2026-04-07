import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 10, background: "#eee" }}>
      <Link to="/candidates">Candidats</Link> |{" "}
      <Link to="/create">Créer</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </div>
  );
}