import React, { useRef, useEffect } from "react";
import "../Header/header.css";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import user_icon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const Header = () => {
  const nav_links = [
    {
      path: "home",
      display: "Home",
    },
    {
      path: "shop",
      display: "Shop",
    },
    {
      path: "cart",
      display: "Cart",
    },
  ];

  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
      } else {
      }
    });
  };
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show_profileActions");
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <Link to={"/home"}>
                  {" "}
                  <h1>GM Candra Mebel</h1>
                </Link>
              </div>
            </div>

            <div className="navigation" ref={menuRef} y>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icons">
              <span className="cart_icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                {" "}
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : user_icon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile_actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to={"/home"}>Home</Link>
                      <Link to={"/shop"}>Shop</Link>
                      <Link to={"/cart"}>Cart</Link>
                      <Link to={"/dashboard"}>Dashboard</Link>
                      <span
                        onClick={logout}
                        className="d-flex align-items-center justify-content-center"
                      >
                        Logout
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to={"/home"}>Home</Link>
                      <Link to={"/shop"}>Shop</Link>
                      <Link to={"/cart"}>Cart</Link>
                      <Link to={"/signup"}>Signup</Link>
                      <Link to={"/login"}>Login</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
