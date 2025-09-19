import React, { useEffect, useState } from "react";
import Home from "../Pages/Home";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Navbar = ({ user, setUser }) => {
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <div>
      <nav className="flex justify-between items-center px-5 py-4 bg-slate-600 text-xl font-bold">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover mr-4 shadow-lg"
          />
          <Link to="/">Home</Link>
          {user && (
            <>
              <Link to="/projects">Projects</Link>
              <Link to="/feedbacks">Feedbacks</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button className="flex" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
