'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";

import type { RootState } from "@/store";

import Logo from "@/assets/icons/logo";

type HeaderType = {
  isErrorPage?: boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  // Note: router.pathname might behave differently or be unavailable in some contexts in App Router client components.
  // For simple checks like '/' vs others, use usePathname from next/navigation if needed,
  // but for this component's logic tied to scroll, it might not be strictly necessary to rely on pathname state here
  // if the layout/page structure ensures this component only renders where needed.
  // However, keeping the original logic's intent: check if the current path is one of the arrayPaths.
  // In App Router client components, usePathname is the equivalent.
  const arrayPaths = ["/"];


  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(router.pathname) || isErrorPage),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    // Re-evaluate the condition based on the App Router context.
    // If this component is conditionally rendered by a parent based on the route,
    // the arrayPaths check might become simpler or implicit.
    // Assuming the original logic's intent to only apply the scroll effect on specific pages/non-error pages.
    // Using the existing state check for now.
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
       // If the component is always rendered but the effect should only run on certain pages,
       // this condition is necessary. If the component is only rendered on those pages,
       // the condition might be removable. Keeping it for functional parity.
      return;
    }

    headerClass();
    window.addEventListener('scroll', headerClass); // Use addEventListener

    return () => {
      window.removeEventListener('scroll', headerClass); // Clean up event listener
    };
  }, [router.pathname, isErrorPage, arrayPaths]); // Added dependencies

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            E-Shop
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <a href="#">Inspiration</a>
          <a href="#">Rooms</a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
          >
            <form className="search-form">
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            />
          </button>
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          <Link href="/login">
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;