import { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link className="res-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="res-link" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="res-link" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="res-link" to="/">
              Cart
            </Link>
          </li>
          <button
            className="login-btn"
            onClick={() => {
              if (btnName == "Login") {
                setBtnName("Logout");
              } else if (btnName == "Logout") {
                setBtnName("Login");
              }
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
