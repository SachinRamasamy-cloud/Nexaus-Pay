// // import React from 'react';
// // import { useLocation, useNavigate } from "react-router-dom";

// // export default function Fpay() {
// //   const location = useLocation(); 
// //   const mode = location.state?.mode || "send";

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen">
// //       {mode === "sus" &&
// //        <h1 className="text-3xl font-bold text-green-600">Payment Successful </h1>}

// //       {mode === "fail" &&
// //        <h1 className="text-3xl font-bold text-red-600">Payment Failed </h1>}

// //       {mode === "bal" &&
// //        <h1 className="text-3xl font-bold text-orange-500">Insufficient Balance </h1>}

// //       {mode === "norec" &&
// //        <h1 className="text-3xl font-bold text-gray-600">Receiver Not Found </h1>}

// //       {mode === "add" && 
// //       <h1 className="text-3xl font-bold text-blue-600">Money Added Successfully </h1>}
// //     </div>
// //   );
// // }

import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiArrowLeftCircle } from "react-icons/fi";

export default function Fpay({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { txId } = location.state || {};

  const mode = location.state?.mode || "sus";
  const transaction = user?.transactions?.find(tx => tx.id === txId);

  const textConfig = {
    sus: { title: "Payment Successful", color: "text-green-600", icon: <FiCheckCircle size={70} className="text-green-600" /> },
    fail: { title: "Payment Failed", color: "text-red-600", icon: <FiXCircle size={70} className="text-red-600" /> },
    bal: { title: "Insufficient Balance", color: "text-orange-500", icon: <FiAlertTriangle size={70} className="text-orange-500" /> },
    norec: { title: "Receiver Not Found", color: "text-gray-600", icon: <FiAlertTriangle size={70} className="text-gray-600" /> },
    add: { title: "Money Added Successfully", color: "text-blue-600", icon: <FiCheckCircle size={70} className="text-blue-600" /> },
  };

  const info = textConfig[mode];

  // return (
  //   <div className="flex flex-col bg-white/50  items-center justify-center py-6 h-screen px-6 animate-fadeIn">
  //     <div className="bg-white flex flex-col p-7 rounded-lg items-center justify-center w-fit">

  //       {/* state */}
  //       <div className="mb-4">
  //         {info.icon}
  //       </div>

  //       {/* title */}
  //       <h1 className={`text-3xl font-bold mb-6 ${info.color}`}>
  //         {info.title}
  //       </h1>

  //       {/* card */}
  //       {(mode === "sus" || mode === "add") && (
  //         <div className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-sm text-center mb-5">
  //           <h2 className="text-xl font-semibold text-gray-700 mb-3">
  //             Transaction Summary
  //           </h2>

  //           <p className="text-gray-800 text-2xl font-bold">₹{transaction.amount || "0"}</p>
  //           <p className="text-gray-600 mt-1">To: {transaction.to || "---"}</p>
  //           <p className="text-xs text-gray-500 mt-1">UPI: {transaction.id || "NA"}</p>

  //           <p className="text-xs text-gray-400 mt-3">
  //             {transaction.date}
  //           </p>
  //         </div>
  //       )}

  //       {/* button to go back */}
  //       <button
  //         onClick={() => navigate("/")}
  //         className="mt-4 flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-80 transition"
  //       >
  //         <FiArrowLeftCircle size={20} />
  //         Back to Dashboard
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col bg-white/50 items-center justify-center min-h-screen px-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">

        {/* State Icon */}
        <div className="flex justify-center mb-4">
          {info.icon}
        </div>

        {/* Title */}
        <h1 className={`text-2xl font-bold mb-6 ${info.color}`}>
          {info.title}
        </h1>

        {(mode === "sus" || mode === "add") && transaction && (
          <div className="bg-white/90 shadow-md rounded-xl p-6 w-full border border-gray-100">

            {/* success badge */}
            <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
              SUCCESS
            </span>

            {/* Amount */}
            <p className="text-4xl font-bold text-gray-900 mt-3">
              ₹{transaction.amount || "0"}
            </p>

            {/* Details */}
            <div className="text-sm text-gray-700 mt-6 space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-500">From</span>
                <span className="font-medium">{user?.name || "---"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">To</span>
                <span className="font-medium">{transaction.to}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">UPI ID</span>
                <span className="font-medium">{transaction.to}@nax</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Ref ID</span>
                <span className="font-medium">{transaction.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date & Time</span>
                <span className="font-medium">
                  {new Date(transaction.date).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                </span>
              </div>

            </div>
          </div>
        )}

        {/* button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-green-700 transition"
        >
          <FiArrowLeftCircle size={20} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );

}
