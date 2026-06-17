import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import Register from "./auth/register";
import Request from "./request/Request";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request" element={<Request />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;