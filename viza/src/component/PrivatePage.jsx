import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector(
    (state) => state.authLogin.isAuthenticate
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token"),isAuthenticated]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateRoute;
