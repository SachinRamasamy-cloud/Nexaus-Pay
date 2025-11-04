import React, { useState } from "react";
import { getUserByNumber, registerUser } from "../server/allAPI";

export default function Register({ setshowreg }) {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("")
  const register = async () => {
    if (!name || !number || !password) return alert("Enter all Feild");

    try {
      const existing = await getUserByNumber(number);
      if (existing) return alert("User already exists");

      const newUser = {
        id: String(Date.now()),
        name,
        password,
        number: String(number).trim(),
        balance: 0,
        transactions: [],
      };

      await registerUser(newUser);

      alert("Registered successfully! Please login.");
      setshowreg(false);
    } catch (err) {
      console.error("Register error:", err);
      alert("Registration failed!");
    }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated BG */}
      <div className="animated-bg absolute inset-0 -z-10"></div>

      {/*container */}
      <div className="grid grid-cols-1 sm:grid-cols-[45%_55%] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-[90%] max-w-4xl h-[80vh]">


        {/* right  */}
        <div className="flex-1 bg-white/70 backdrop-blur-md p-6 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            New Here!
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Then create a account and start you life with us
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                UPI ID
              </label>
              <input
                value={number}
                onChange={(e) => setnumber(e.target.value)}
                type="number"
                placeholder="78945203"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                User name
              </label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text"
                placeholder="Sr"
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
              Register
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => setshowreg(false)}
              className="text-purple-700 font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>

        {/*left imag */}
        <div className="hidden sm:flex h-full flex items-stretch justify-center bg-transparent">
          <img
            src="https://i.pinimg.com/originals/2f/b9/ca/2fb9cae9fdb0110d8a57e9cc394f35dd.gif"
            alt="Login Illustration"
            className="h-full w-full object-cover opacity-90 bg-transparent"
          />
        </div>

      </div>
    </div>
  );
}