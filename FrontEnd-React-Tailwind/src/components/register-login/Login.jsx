import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = { email, password };

      const response = await fetch("https://app-911c1751-2ae2-4279-bd11-cb475df87978.cleverapps.io/auth/login", {
        

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),

      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de inicio de sesión");
      }

      const data = await response.json();
      const authToken = data.token;
      console.log(authToken);
      
      login(authToken);
      
    } catch (error) {
      setError(error.message);
      console.error("Error en la solicitud de inicio de sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    
  };
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen flex items-center justify-center">
      <div className="text-center mb-8 mr-2">
        <h1 className="text-6xl text-gray-700 font-extrabold mb-2">
          ALQUILAFÁCIL.COM
        </h1>
        <hr className="w-1/4 border-t-2 border-gray-700 mx-auto mb-4" />
        <p className="text-lg text-gray-700">
          La forma más conveniente de alquilar lo que necesitas.
        </p>
      </div>
      <div className="border-2 border-gray-300 p-4 rounded-lg shadow-lg w-80">
        <h1 className="text-xl font-semibold text-center mb-4">Iniciar sesión</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
        <div className="mb-4 text-center">
          ¿No estás registrado?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
