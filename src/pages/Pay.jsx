import React, { useEffect, useState } from "react";
import { getAllUsers, getUserByNumber, updateUser } from "../server/allAPI";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pay({ user, setuser }) {
  const [users, setusers] = useState([]);
  const [amount, setamount] = useState("");
  const [receiver, setreciver] = useState("");
  const location = useLocation();
  const mode = location.state?.mode || "send";
  const transactions = user.transactions || [];
  const [history, sethistory] = useState("");
  const [loading, setloading] = useState(false) //loading while send money
  const [recivernm, setrecivernm] = useState(null)

  const loaduser = async () => {
    const all = await getAllUsers();
    setusers(all.filter((u) => u.number !== user.number));

  };
  // resukt page
  const navigate = useNavigate()


  //   const satues = (action) => {
  // setTimeout(()=>{
  //       setloading(false)
  //     if (action === "sus")
  //       navigate("/fpay", { state: { mode: "sus" } });
  //     else if (action === "bal")
  //       navigate("/fpay", { state: { mode: "bal" } });
  //     else if (action === "norec")
  //       navigate("/fpay", { state: { mode: "norec" } });
  //     else if (action === "add")
  //       navigate("/fpay", { state: { mode: "add" } });
  //     else {
  //       navigate("/fpay", { state: { mode: "fail" } })
  //     }
  // },3000)
  //   };
  const satues = (action, txId) => {
    setTimeout(() => {
      setloading(false);

      let mode;
      if (action === "sus") mode = "sus";
      else if (action === "bal") mode = "bal";
      else if (action === "norec") mode = "norec";
      else if (action === "add") mode = "add";
      else mode = "fail";

      navigate("/fpay", {
        state: {
          mode,
          txId
        }
      });
    }, 3000);
  };


  // const satues = (action) => {
  //   setloading(false)
  //   if (action === "sus")
  //     navigate("/fpay", { state: { mode: "sus" } });
  //   else if (action === "bal")
  //     navigate("/fpay", { state: { mode: "bal" } });
  //   else if (action === "norec")
  //     navigate("/fpay", { state: { mode: "norec" } });
  //   else if (action === "add")
  //     navigate("/fpay", { state: { mode: "add" } });
  //   else {
  //     navigate("/fpay", { state: { mode: "fail" } })
  //   }
  // };

  // load user data ehrn enter
  useEffect(() => {
    loaduser();
    const interval = setInterval(loaduser, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const loadnm = async () => {
      const user = await getUserByNumber(receiver);
      if (user) {
        setrecivernm(user.name);
      } else {
        setrecivernm("User not found");
      }
    };
    if (receiver) loadnm();
  }, [receiver]);

  //  send money
  const sendmoney = async () => {
    // check the sender and numver
    if (receiver == user.number)
      return alert("cant send money to your self");

    const amountnum = Number(amount);
    if (amountnum <= 0)
      return alert("Invaid Amount");

    // get user data
    const sender = await getUserByNumber(user.number);
    const receivernum = await getUserByNumber(receiver);
    // check reciver valid and balance
    if (!receivernum)
      return satues("norec")
    if (sender.balance < amountnum)
      return satues("bal")

    const date = new Date().toISOString();

    const senderTx = {
      id: Date.now(),
      type: "sent",
      amount: amountnum,
      to: receivernum.name,
      from: sender.name,
      date: date,
    };

    const receiverTx = {
      id: Date.now(),
      type: "received",
      amount: amountnum,
      to: receivernum.name,
      from: sender.name,
      date: date,
    };

    // upd sender
    const updatedsender = {
      ...sender,
      balance: sender.balance - amountnum,
      transactions: [...(sender.transactions || []), senderTx],
    };

    // upd reciver
    const updatedreceiver = {
      ...receivernum,
      balance: receivernum.balance + amountnum,
      transactions: [...(receivernum.transactions || []), receiverTx],
    };

    // upd both
    await updateUser(sender.id, updatedsender);
    await updateUser(receivernum.id, updatedreceiver);

    // upd local
    setuser(updatedsender);
    localStorage.setItem("user", JSON.stringify(updatedsender));
    return satues("sus", senderTx.id)
  };

  // addmoney
  const addmoney = async () => {
    const amountnum = Number(amount);
    if (amountnum <= 0) return alert("invalid number");

    // get data
    const sender = await getUserByNumber(user.number);

    // upd balance
    const date = new Date().toISOString();

    const updsender = {
      ...sender,
      balance: sender.balance + amountnum,
      transactions: [
        ...(sender.transactions || []),
        {
          id: Date.now(),
          type: "add",
          amount: amountnum,
          to: sender.name,
          from: "Deposited",
          date: date,
        },
      ],
    };

    await updateUser(sender.id, updsender);
    setuser(updsender);
    localStorage.setItem("user", JSON.stringify(updsender));

    return satues("add")
  };
  // check mode
  const handlepay = () => {
    if (loading) return;
    setloading(true);

    if (mode === "send") {
      sendmoney();
    } else {
      addmoney();
    }
  };


  return (
    <>
      {
        loading && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            {/* <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
         */}
            <div className="p-3 rounded-lg bg-white">
              <img
                className="w-[300px] h-[280px]"
                src="https://i.pinimg.com/originals/6c/59/8b/6c598b8cb38df244eda78f8eb2f6c425.gif"
                alt="" />
            </div>
          </div>
        )
      }
      <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] gap-6 p-4">
        {/* Left side */}
        <div className="flex-1 bg-white/55 rounded-xl shadow-md p-6 space-y-6 h-fit">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">
              {mode === "send" ? "Send Money" : "Add Money"}
            </h1>
          </div>
          {/* 
          {mode === "send" && (
            <div className="">
              <div className="relative">
                <i className="fa-solid fa-user text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"></i>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 rounded-lg pl-10 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={receiver}
                  onChange={(e) => setreciver(e.target.value)}
                  placeholder="Enter Receiver Number / UPI ID"
                  disabled={loading}
                  list="receiversList"
                />
                <datalist id="receiversList">
                  {users.map((user, idx) => (
                    <option key={idx} value={user.number} />
                  ))}
                </datalist>
              </div>
              <div className="">To : {recivernm}</div>
            </div>
          )} */}
          {mode === "send" && (
            <div className="space-y-2">
              <div className="relative">
                <i className="fa-solid fa-user text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"></i>

                <input
                  type="text"
                  className="w-full p-3 bg-gray-100 rounded-xl pl-10 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={receiver}
                  onChange={(e) => setreciver(e.target.value)}
                  placeholder="Receiver Number / UPI ID"
                  disabled={loading}
                  list="receiversList"
                />

                <datalist id="receiversList">
                  {users.map((user, idx) => (
                    <option key={idx} value={user.number} />
                  ))}
                </datalist>
              </div>

                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm animate-fade-in">
                  <div className="">To:</div>
                  <div className="leading-tight">
                    <p className="font-semibold text-gray-900">{recivernm}</p>
                    <p className="text-xs text-gray-500">{receiver}</p>
                  </div>

                  <i className="fa-solid fa-check text-green-600 text-xl ml-auto"></i>                </div>
            </div>
          )}

          <div className="relative">
            <i className="fa-solid fa-indian-rupee-sign text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input
              type="number"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-lg pl-10 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-lg font-semibold"
              placeholder="0.00"
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-center">
            <button className="flex-1 blackhover-btn p-3 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-qrcode mr-2" aria-hidden="true"></i>QR Code
            </button>
            <button className="flex-1 blackhover-btn p-3 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-wallet mr-2" aria-hidden="true"></i>Wallet
            </button>
            <button className="flex-1 blackhover-btn p-3 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-credit-card mr-2" aria-hidden="true"></i>Credit Card
            </button>
          </div>

          <button
            className="w-full p-3 bg-[#3A7BFF] hover:bg-[#2F6DE0] dshine-button text-white rounded-lg font-semibold"
            onClick={handlepay}
            disabled={loading}
          >
            {mode === "send" ? `Pay  ₹ ${amount}` : `Add Money ₹ ${amount}`}
          </button>

          <div className="flex justify-between items-center">
            <button className="text-red-500 font-medium">Cancel</button>
            <div className="flex gap-4">
              <button className="p-2 border rounded-lg">Scan QR Code</button>
              <button className="p-2 border rounded-lg">Select from Contacts</button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1  space-y-4">
          <div className="rounded-lg p-4 space-y-5 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <div className="space-y-3">
              {[...transactions].reverse().slice(0, 3).map((tran, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-white/70 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <img
                        src="https://i.pravatar.cc/40"
                        className="rounded-full w-10 h-10 object-cover"
                        alt="user"
                      />
                      {tran.type === "sent" && (
                        <i className="fa-solid fa-arrow-up text-red-500 text-xs absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm"></i>
                      )}
                      {tran.type === "received" && (
                        <i className="fa-solid fa-arrow-down text-green-500 text-xs absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm"></i>
                      )}
                      {tran.type === "add" && (
                        <i className="fa-solid fa-plus text-blue-500 text-xs absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm"></i>
                      )}
                    </div>

                    <div>
                      <span className="font-medium text-black capitalize">
                        {tran.type === "sent" ? tran.to : tran.from}
                      </span>
                      <br />
                      <span className="text-sm text-gray-600">{tran.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${tran.type === "sent"
                        ? "text-red-500"
                        : tran.type === "received"
                          ? "text-green-500"
                          : "text-blue-600"
                        }`}
                    >
                      ₹{tran.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div onClick={() => navigate("/transaction")} className="rounded-xl bg-white p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3 text-gray-800 font-medium">
              <div className="p-2 bg-green-100 text-green-600 rounded-full">
                <i className="fa-solid fa-money-bill-transfer text-lg"></i>
              </div>
              <span className="text-[15px] sm:text-[16px]">View Recent Transactions</span>
            </div>

            <i className="fa-solid fa-chevron-right text-gray-400 text-sm"></i>
          </div>
        </div>
      </div>
    </>
  );
}
