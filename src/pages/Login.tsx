import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "John", role: "RM" });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded"
        onClick={handleLogin}
      >
        Login as RM
      </button>
    </div>
  );
};

export default Login;
