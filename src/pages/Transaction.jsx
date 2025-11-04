import React, { useState, useMemo, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

export default function Transaction({ user, setuser }) {
  const transactions = user.transactions || [];
  const topspend = useState("")
  const [open, setOpen] = useState(false);

  // const [filter, setFilter] = useState("All");
  // // memo is used to load data when transaction update oposite of the useffect
  // const filteredTx = useMemo(() => {
  //   if (filter === "All")
  //     return transactions;
  //   if (filter === "Sent")
  //     return transactions.filter(tx => tx.type === "sent");
  //   if (filter === "Received")
  //     return transactions.filter(tx => tx.type === "received");
  //   if (filter === "Failed")
  //     return transactions.filter(tx => tx.status === "failed");
  //   return transactions;
  // }, [filter, transactions]);
  const [filtered, setfiltered] = useState(transactions);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (filter === "All") 
      setfiltered(transactions);
    else if (filter === "Sent") 
      setfiltered(transactions.filter(tx => tx.type === "sent"));
    else if (filter === "Received") 
      setfiltered(transactions.filter(tx => tx.type === "received"));
    else if (filter === "Failed") 
      setfiltered(transactions.filter(tx => tx.status === "failed"));
  }, [filter, transactions]);
  const total = filtered.length

  return (
    <div className="min-h-screen py-10 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          All Transactions ({total})
        </h1>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
          <FiDownload className="text-lg" />
          Export CSV
        </button>
      </div>

      {/* filter  */}
      <div className="flex flex-wrap gap-4 mb-8">
        {["All", "Sent", "Received", "Failed"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-6 py-2.5 font-semibold rounded-xl border transition-all duration-300 shadow-sm ${filter === btn
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg"
              }`}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="">
        <div>
          {/* recent transactiom */}
          <h6 className="text-gray-500 font-medium mt-6 ml-2">Recent Transactions</h6>
          <div className="mt-3 space-y-4">
            {[...filtered].reverse().map((tx, idx) => {

              return (
                <div
                  key={idx}
                  onClick={() => setOpen(!open)}
                  className="group relative bg-white/80 border border-gray-200 rounded-2xl shadow-md p-5 
        hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 
        overflow-hidden cursor-pointer"
                >
                  {/* main card */}
                  <div className="flex justify-between items-center">
                    <div>
                      {/* <h2 className="font-semibold text-gray-800 text-lg">{tx.to}</h2>
                       */}
                      <h2 className="font-semibold text-gray-800 text-lg">
                        {tx.type === "sent"
                          ? tx.to
                          : tx.type === "received"
                            ? tx.from
                            : user.name}
                      </h2>
                      <p className={`text-sm ${tx.type === "sent"
                        ? "text-red-500"
                        : tx.type === "received"
                          ? "text-green-600"
                          : "text-blue-600"
                        }`}>
                        {tx.type === "sent"
                          ? "Sent money"
                          : tx.type === "received"
                            ? "Received money"
                            : "Added to wallet"}
                      </p>
                    </div>

                    <div className="text-right">
                      <h3 className={`text-lg font-bold ${tx.type === "sent"
                        ? "text-red-500"
                        : tx.type === "received"
                          ? "text-green-600"
                          : "text-blue-600"
                        }`}>
                        ₹{tx.amount}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(tx.date).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Hover / Tap Expand Section */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out text-sm text-gray-600 mt-3 
          bg-gray-50/80 rounded-xl border-t border-gray-200
          ${open ? "max-h-40 p-4" : "max-h-0 p-0"}
          group-hover:max-h-40 group-hover:p-4`}
                  >
                    <div className="flex justify-between">
                      <span>Transaction ID:</span><span>{tx.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>From:</span><span>{tx.from}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>To:</span><span>{tx.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${tx.status === "failed" ? "text-red-500" : "text-green-600"}`}>
                        Success
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>


        </div>
      </div >
    </div >
  );
}
