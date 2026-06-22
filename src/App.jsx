import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/register"; 
import Login from "./auth/login"; 
import Profile from "./auth/profile"; 
function App() { 
  return (  
        <BrowserRouter> 
      <Routes> 
                <Route path="/" element={<Register />} />
   <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />         
    <Route path="/profile" element={<Profile />} />
  </Routes> 
    </BrowserRouter>
  //  <> 
//<Register />    
//</>
    );
}

export default App;