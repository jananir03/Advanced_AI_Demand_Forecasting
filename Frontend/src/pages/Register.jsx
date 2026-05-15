import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

  name: "",
  email: "",
  password: "",
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {

    try {

      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
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

      {/* Register Card */}
      <div className="flex items-center justify-center mt-16">

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30 w-[420px]">

          <h1 className="text-4xl font-bold text-slate-800 text-center">

            Create Account

          </h1>

          <p className="text-slate-700 text-center mt-3">

            Start your AI forecasting journey

          </p>

          <div className="mt-8 flex flex-col gap-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-4 rounded-xl bg-white text-slate-800 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
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
              onClick={handleRegister}
              className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Register
            </button>

            <p className="text-center text-slate-700">

              Already have an account?

              <Link
                to="/"
                className="font-bold ml-2 text-blue-900"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;