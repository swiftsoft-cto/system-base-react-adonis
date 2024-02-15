import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecoverPass from "./pages/RecoverPass";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/redefinir-senha/:token" element={<RecoverPass />} />
      </Routes>
    </BrowserRouter>
  );
}
