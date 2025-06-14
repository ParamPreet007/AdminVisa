import { Route, Routes } from "react-router-dom";
import AuthForget from "./pages/authForget/AuthForget";
import LoginPage from "./pages/login/Login";
import AppLayout from "./layout/Layout";
import VisaLandingPage from "./pages/userPage/UserPage";
import SignUpPage from "./pages/signUp/SignUp";


function App() {
  // useEffect(() => {
  //   document.addEventListener("contextmenu", (event) => event.preventDefault())
  // }, [])
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element={<AuthForget />} />
      <Route path="/user-page" element={<VisaLandingPage/>}/>
      <Route path="/signUp" element ={<SignUpPage/>} />
      <Route path="*" element={<AppLayout />} />

    </Routes>
   
  );
}

export default App;
