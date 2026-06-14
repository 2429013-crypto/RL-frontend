import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/register"; 
import Login from "./auth/login";
function App() { 
  return (  
        <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  //  <> 
//<Register />    
//</>
    );
}

export default App;