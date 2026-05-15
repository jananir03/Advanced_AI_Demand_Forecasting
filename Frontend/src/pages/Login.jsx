import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {

    try {

      // OAuth2 form data
      const loginData = new URLSearchParams();

      loginData.append(
        "username",
        formData.username
      );

      loginData.append(
        "password",
        formData.password
      );

      const response = await API.post(

        "/auth/login",

        loginData,

        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      // Store JWT token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // Store user info
      localStorage.setItem(
        "userName",
        response.data.name
      );

      localStorage.setItem(
        "userEmail",
        response.data.email
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900">

      {/* Top Navbar */}
      <div className="w-full bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg p-5">

        <h1 className="text-3xl font-bold text-slate-800 text-center">

          AI Demand Forecasting

        </h1>

      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center mt-20">

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30 w-[420px]">

          <h1 className="text-4xl font-bold text-slate-800 text-center">

            Welcome Back

          </h1>

          <p className="text-slate-700 text-center mt-3">

            Login to continue forecasting analytics

          </p>

          <div className="mt-8 flex flex-col gap-5">

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="p-4 rounded-xl bg-white text-slate-800 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-4 rounded-xl bg-white text-slate-800 outline-none"
            />

            <button
              onClick={handleLogin}
              className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Login
            </button>

            <p className="text-center text-slate-700">

              Don’t have an account?

              <Link
                to="/register"
                className="font-bold ml-2 text-blue-900"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;