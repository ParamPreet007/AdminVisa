import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector(
    (state) => state.authLogin.isAuthenticate
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isAuthenticated, localStorage.getItem("token")]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateRoute;
