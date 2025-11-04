import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { icon: "fas fa-home", label: "Dashboard", path: "/" },
    { icon: "fas fa-credit-card", label: "Pay Bills", path: "/pay" },
    { icon: "fas fa-wallet", label: "Transactions", path: "/transaction" },
    { icon: "fas fa-gift", label: "Offers", path: "/offers" },
    { icon: "fas fa-cog", label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`fixed sm:static top-0 left-0 h-full w-64 
      bg-gradient-to-b from-[#0A1227] to-[#004CFF] text-white p-6 
      flex flex-col justify-between shadow-2xl
      transition-transform duration-300 z-50
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
    >
      <div className="flex flex-col gap-8">
        {/*name  */}
        <div className="flex items-center gap-3 mt-2">
          <img src={logo} className="h-12 w-12 rounded-full shadow-lg" alt="" />
          <h1 className="text-xl font-bold tracking-wide">Nexaus Pay</h1>
        </div>

        {/* menu */}
        <nav className="flex flex-col gap-3">
          {menu.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={idx}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left
                transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-[#004CFF] shadow-lg scale-[1.05]"
                    : "text-gray-200 hover:bg-white/10"
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          alert("Current account is logged out");
          localStorage.clear();
          window.location.reload();
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl 
        bg-red-600/80 hover:bg-red-600 transition duration-300 font-semibold"
      >
        <i className="fas fa-sign-out-alt text-xl"></i>
        Logout
      </button>
    </div>
  );
}
