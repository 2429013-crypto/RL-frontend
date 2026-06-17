import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import Register from "./auth/register"; 
import Request from "./request/Request"; 
import Profile from "./auth/profile"; 
function App() { 
  return (  
        <BrowserRouter>
      <Routes> 
                <Route path="/" element={<Register />} />
        <Route path="/" element={<Login />} />
   <Route path="/register" element={<Register />} />
    <Route path="/request" element={<Request />} />         
    <Route path="/profile" element={<Profile />} />
  </Routes> 
    </BrowserRouter>
  //  <> 
//<Register />    
//</>
    );
}

export default App;