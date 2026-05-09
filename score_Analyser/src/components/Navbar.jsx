import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FiHome, FiClock, FiInfo } from "react-icons/fi";
import { LuCalculator } from "react-icons/lu";
import { FiSun, FiMoon } from "react-icons/fi";
import rocketImg from "../assets/rocket.png";
import logo from "../assets/logo.png";

const Navbar = () => {
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

      <div className="theme-toggle">
        <FiSun className="theme-icon"/>
         <span></span>
         <FiMoon className="theme-icon"/>
      </div>
    </aside>
  );
};

export default Navbar;
