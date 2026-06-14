import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/register";           
// import Login from "./auth/login";
 function App() { 
  return (  
     <> 
 <Register />    
 </>           
     );
} 
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
export default App; 
