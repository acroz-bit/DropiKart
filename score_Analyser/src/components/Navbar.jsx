import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FiHome, FiClock, FiInfo } from "react-icons/fi";
import { LuCalculator } from "react-icons/lu";
import { FiSun, FiMoon } from "react-icons/fi";
import rocketImg from "../assets/rocket.png";
import logo from "../assets/logo.png";

const THEME_STORAGE_KEY = "dropikart-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const Navbar = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo"/>
         <span>DropiKart</span>
         </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/">
          <FiHome className="nav-icon"/>
          Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/analyse">
          <LuCalculator className="nav-icon"/>
         Analyse Product</NavLink>
        </li>
        <li>
          <NavLink to="/history">
          <FiClock className="nav-icon"/>
          History</NavLink>
        </li>
        <li>
          <NavLink to="/about">
          <FiInfo className="nav-icon"/>
         About</NavLink>
        </li>
      </ul>

      <div className="pro-tip">
        <div className="rocket">
            <img src={rocketImg} alt="rocket"/>
        </div>
        <h3>Pro Tip</h3>
        <p>Products with score above 70 have higher chance of success.</p>
      </div>

      <button
        type="button"
        className={`theme-toggle ${theme}`}
        onClick={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
          )
        }
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        <FiSun className={`theme-icon ${theme === "light" ? "active" : ""}`} />
        <span className="theme-track">
          <span className="theme-thumb"></span>
        </span>
        <FiMoon className={`theme-icon ${theme === "dark" ? "active" : ""}`} />
      </button>
    </aside>
  );
};

export default Navbar;
