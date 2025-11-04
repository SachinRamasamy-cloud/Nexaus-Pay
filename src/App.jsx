import './App.css';
import Dashboard from './pages/Dashboard';
import Slidebar from './components/Slidebar';
import Header from './components/Header';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import { getUserByNumber } from "./server/allAPI";
import Pay from './pages/Pay';
import Transaction from './pages/Transaction';
import Fpay from './pages/Fpay';


export default function App() {
  const [user, setuser] = useState(null);
  const [showreg, setshowreg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // save the user data in LS
  useEffect(() => {
    const saved = localStorage.getItem("user");
    try {
      if (saved && saved !== "undefined" && saved !== "null") {
        setuser(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to parse saved user:", err);
      localStorage.removeItem("user");
    }
  }, []);


  useEffect(() => {
    if (!user)
      return
    // UPDATE user data 
    const interval = setInterval(async () => {
      const update = await getUserByNumber(user.number);
      if (update) {
        setuser(update);
        localStorage.setItem("user", JSON.stringify(update))
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [user])

  // login checking
  if (!user) {
    return showreg ? (
      <Register setshowreg={setshowreg} />
    ) : (
      <Login setuser={setuser} setshowreg={setshowreg} />
    );
  }

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login setuser={setuser} setshowreg={setshowreg} />} />
          <Route path="/register" element={<Register setshowreg={setshowreg} />} />
          
          <Route path="*" element={<Login setuser={setuser} setshowreg={setshowreg} />} />
        </Routes>
      ) : (
        <div className="flex h-screen relative bg-gray-100">
          {/* anime display comes here */}
          {/* <div className="animated-bg absolute inset-0 -z-10"></div> */}
          <Slidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 flex flex-col p-2 overflow-auto">
            <Header setSidebarOpen={setSidebarOpen} />
            <Routes>
              <Route path="/" element={<Dashboard user={user} setuser={setuser} />} />
              <Route path="/pay" element={<Pay user={user} setuser={setuser} />} />
              <Route path="/transaction" element={<Transaction user={user} setuser={setuser} />} />
              <Route path="/fpay" element={<Fpay user={user} setuser={setuser} />} />
            </Routes>
          </main>
        </div>
      )
      }
    </Router >
  );
}

