
import React, { useState } from "react";
import { getUserByNumber } from "../server/allAPI";
import { useNavigate } from "react-router-dom";

export default function Login({ setuser, setshowreg }) {
  const [number, setNumber] = useState("");
  const [password, setpassword] = useState("")

  // const handleLogin = async () => {
  //   if (!number || !password) return alert("Enter number or password");
  //   const user = await getUserByNumber(number);
  //   if (!user) {
  //     alert("User not found");

  //   }
  //   if (user.password !== password) {
  //     return ("password is incorrect")
  //   }
  //   setuser(user);
  //   localStorage.setItem("user", JSON.stringify(user));

  // };
  const handleLogin = async () => {
    if (!number || !password)
      return alert("Enter number and password");

    const user = await getUserByNumber(number);

    if (!user) {
      return alert("User not found");
    }

    if (user.password !== password) {
      return alert("Password is incorrect");
    }

    setuser(user);
    localStorage.setItem("user", JSON.stringify(user));
    alert("Login successful");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animae bg */}
      <div className="animated-bg absolute inset-0 -z-10"></div>

      {/* Center container */}
      <div className="grid grid-cols-1 sm:grid-cols-[55%_45%] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-[90%] max-w-4xl h-[80vh]">

        {/* left image */}
        <div className="hidden sm:flex h-full flex items-stretch justify-center bg-transparent">
          <img
            src="https://www.ezupivip.in/images/1.gif"
            alt="Login Illustration"
            className="h-full w-full object-cover opacity-90 bg-transparent"
          />
        </div>

        {/* right  */}
        <div className="flex-1 bg-white/70 backdrop-blur-md p-10 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Login to continue to your account
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                UPI ID
              </label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                placeholder="78945203"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="dshine-button w-full bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-800 transition"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={() => setshowreg(true)}
              className="text-purple-700 font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
