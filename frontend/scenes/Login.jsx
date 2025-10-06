import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Logo from "../assets/Logo.png";
import RobotDoctor from "../assets/RobotDoctor.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDiagnosis, setLogin } from "../state/state";

const Login = ({ changePage }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = async () => {
    const res = await fetch("api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const userInfo = await res.json();

    if (userInfo.error) {
      return console.log("Error logging in:", userInfo.error);
    }

    dispatch(
      setLogin({
        user: userInfo,
      }),
      setDiagnosis({ diagnosis: null }
      )
    );

    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your login logic here
    setLoading(false);
  };

  return (
    <div className="flex border">
      <div className="flex justify-center items-center min-h-screen w-[35%] bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
          <div className="flex justify-center mb-4">
            <Avatar
              alt="Profile Image"
              src={Logo}
              sx={{ width: 75, height: 75 }}
              className=""
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900">Welcome</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-400 focus:border-lime-400"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-400 focus:border-lime-400"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-900 hover:text-lime-400">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handlelogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:text-blue-900 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a
              href="#"
              className="text-blue-900 hover:text-lime-400"
              onClick={() => changePage(false)}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="w-[65%] flex justify-center items-center">
        <div className="rounded-full bg-white border border-lime-400 border-2">
          <img
            src={RobotDoctor}
            alt=""
            className="size-[800px] mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
