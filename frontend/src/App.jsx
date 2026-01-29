import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/registration";
import EmailVerification from "./pages/verification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verify" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;