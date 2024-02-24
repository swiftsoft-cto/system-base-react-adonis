// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecoverPass from "./pages/RecoverPass";
import ClientProject from "./pages/Client/Project";
import PrivateRoute from "./utils/PrivateRoute";
import Unauthorized from "./pages/401";
import Register from "./pages/Register";
import NotFound from "./pages/404";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          <Route path="/redefinir-senha/:token" element={<RecoverPass />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<PrivateRoute accessLevel={1} />}>
            <Route path="/admin/dashboard" element={<ClientProject />} />
          </Route>

          <Route element={<PrivateRoute accessLevel={2} />}>
            <Route path="/cliente/dashboard" element={<ClientProject />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
