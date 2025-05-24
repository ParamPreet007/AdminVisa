import { Route, Routes } from "react-router-dom";
import AuthForget from "./pages/authForget/AuthForget";
import LoginPage from "./pages/login/Login";
import AppLayout from "./layout/Layout";


function App() {
  // useEffect(() => {
  //   document.addEventListener("contextmenu", (event) => event.preventDefault())
  // }, [])
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element={<AuthForget />} />
      <Route path="*" element={<AppLayout />} />

    </Routes>
   
  );
}

export default App;
