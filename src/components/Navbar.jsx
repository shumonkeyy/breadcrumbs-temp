import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SchoolContext } from "../context/Context";
import GoogleTranslateWidget from "./GoogleTranslate";

const Navbar = () => {
  const { mapLink, clubLink, faqLink, counseling } = useContext(SchoolContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand notranslate">
            breadcrumbs...
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {mapLink && (
                  <Link to={`/${mapLink}`} className="nav-link">
                    MAP
                  </Link>
                )}
              </li>
              {faqLink && (
                <li className="nav-item">
                  <Link to={`/${faqLink}`} className="nav-link">
                    FAQ
                  </Link>
                </li>
              )}
              {clubLink && (
                <li className="nav-item">
                  <Link to={`/${clubLink}`} className="nav-link">
                    CLUBS
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <GoogleTranslateWidget />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
