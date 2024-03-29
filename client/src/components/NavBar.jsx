import "./Navbar.css";

import LogoImg2 from "../images/logonavbar.jpg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CartWithItems from "./CartWithItems";
import EmptyCart from "./EmptyCart";
import { CartContext } from "../views/ProductPage";
import { RxCross2 } from "react-icons/rx";
import { PiShoppingCart } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [cart, setCart] = useState(false);

  const { cartItem } = useContext(CartContext);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const openCart = () => {
    setCart(!cart);
  };

  window.addEventListener("scroll", handleScroll);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`mobile-nav-full ${mobileNav ? "open-flex" : "closed-flex"}`}
      >
        <RxCross2  onClick={() => setMobileNav(!mobileNav)} className="x-mobile" />
        <div className="mobile-links">
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/all">
            categories
          </Link>
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/lamps">
            lamps
          </Link>
          <Link
            onClick={() => setMobileNav(!mobileNav)}
            to="/categories/product/19"
          >
            product page
          </Link>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={openCart}
        className={`page-overlay ${cart ? "open-flex" : "closed-flex"}`}
      ></div>

      {/* cart */}
      <div className={`cart-div ${cart ? "open-cart" : "closed-cart"}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">
            Your Shopping Cart ({cartItem.length})
          </h2>
          <RxCross2 onClick={openCart} />
        </div>

        <div className="cart-body">
          {cartItem.length < 1 ? (
            <EmptyCart openCart={openCart} />
          ) : (
            <CartWithItems />
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className={`nav-container ${sticky ? "cont-sticky" : ""}`}>
            <Link to="/">
              <img
                onClick={scrollToTop}
                src={LogoImg2}
                alt="logo"
                className="logo-img"
              />
            </Link>
            <div className="nav-links">
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
                categories
              </Link>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/categories/product/19"
              >
                product page
              </Link>
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              >
                <PiShoppingCart />
              </i>
            </div>
            <div className="hamburger-menu">
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`hamburger-cart ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              >
                <PiShoppingCart />
              </i>
              <i
                onClick={() => setMobileNav(!mobileNav)}
                className="hamburger-hamb"
              >
                <IoMdMenu />
              </i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
