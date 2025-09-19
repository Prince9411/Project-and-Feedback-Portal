import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Feedbacks from "./Pages/Feedbacks";
import API from "./API";
import AddProjects from "./components/AddProjects";
import Login from "./Pages/Login";
import { useState, useEffect } from "react";
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [projects, setProjects] = useState([]);  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/Projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setProjects(res.data);
        console.log("Projects Loaded");
      } catch (error) {
        console.error(error);
      }
    };
    fetch();

    // ✅ Safe JSON.parse
    const storedData = localStorage.getItem("user");
    try {
      setUser(storedData ? JSON.parse(storedData) : null);
    } catch (e) {
      console.error("Invalid user in localStorage:", storedData);
      setUser(null);
    }
  }, []);
  
  return (
    <div className="text-white">
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/projects" element={<ProtectedRoute><Projects projects={projects} setProjects={setProjects} user={user}/></ProtectedRoute>}></Route>
        <Route path="/feedbacks" element={<ProtectedRoute><Feedbacks/></ProtectedRoute>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login setUser={setUser}/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
