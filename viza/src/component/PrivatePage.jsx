import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component }) => {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateRoute;
