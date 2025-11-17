import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LuChefHat } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import '../App.css'

const Header = () => {
  return (
    <div className="d-flex d-flex justify-content-center">
      <div
        style={{ position: "fixed", width: "100%", zIndex: "999" }}
        className="container mt-4"
      >
        <Navbar
          className="rounded-5 px-5 py-3 shadow"
          style={{ backgroundColor: "hsl(35 20% 88%)" }}
          data-bs-theme="dark"
        >
          <Container>
            <Link
              className="text-decoration-none me-2 fs-5 link-hover"
              style={{ color: "hsl(16 85% 58%)" }}
              to="/"
            >
              <LuChefHat className="fs-2 me-1 mb-1" /> Tasty Bites
            </Link>
            <Nav className="ms-auto">
              <NavLink
                className={({ isActive }) =>
                  `link-hover text-dark text-decoration-none me-3 ${
                    isActive
                      ? "bg-color1 text-white px-3 py-2 rounded-3"
                      : "mt-2"
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `link-hover text-dark text-decoration-none me-3 ${
                    isActive
                      ? "bg-color1 text-white px-3 py-2 rounded-3"
                      : "mt-2"
                  }`
                }
                to="/recipes"
              >
                Recipes
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `link-hover text-dark text-decoration-none me-3 ${
                    isActive
                      ? "bg-color1 text-white px-3 py-2 rounded-3"
                      : "mt-2"
                  }`
                }
                to="/about"
              >
                About
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
