import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Candidates from "./pages/Candidates";
import Form from "./pages/Form";
import Detail from "./pages/Detail";

function PrivateRoute({ children }: any) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/candidates"
        element={
          <PrivateRoute>
            <Candidates />
          </PrivateRoute>
        }
      />

      <Route
        path="/create"
        element={
          <PrivateRoute>
            <Form />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <Form />
          </PrivateRoute>
        }
      />

      <Route
        path="/detail/:id"
        element={
          <PrivateRoute>
            <Detail />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}