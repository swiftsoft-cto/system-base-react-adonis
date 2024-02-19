//src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecoverPass from "./pages/RecoverPass";
import PrivateRoute from "./components/PrivateRoute"; // Importe o componente PrivateRoute

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}> // Envolve as rotas protegidas com PrivateRoute
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/redefinir-senha/:token" element={<RecoverPass />} />
      </Routes>
    </BrowserRouter>
  );
}
