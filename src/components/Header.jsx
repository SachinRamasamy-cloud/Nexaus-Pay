import React from "react";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="flex justify-between items-center p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl 
rounded-2xl shadow-md transition-all duration-300 border border-white/20 dark:border-gray-700/40">
      <button
        className="lg:hidden p-3 rounded-xl bg-gray-200 dark:bg-gray-700
  hover:scale-110 transition-all duration-300"
        onClick={() => setSidebarOpen(true)}
      >
        <i className="fas fa-bars text-gray-700 dark:text-gray-200 text-xl"></i>
      </button>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 w-full max-w-lg
   focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-blue-500 transition-all duration-300">
        <i className="fas fa-search text-gray-400 dark:text-gray-300"></i>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none flex-1 text-gray-700 dark:text-gray-200"
        />
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Filter</button>
      </div>

      <div className="flex items-center gap-6 ml-6">

        {/* Notification Button */}
        <button className="relative group">
          <i className="fas fa-bell text-gray-600 dark:text-gray-300 group-hover:text-blue-500 
       transition-all duration-300 text-xl"></i>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full 
       animate-ping opacity-70"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative cursor-pointer group">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-blue-500 group-hover:ring-4 
         group-hover:ring-blue-300/40 transition-all duration-300"
          />
        </div>

      </div>
    </header>

  );
}
