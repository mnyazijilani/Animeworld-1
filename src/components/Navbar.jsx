import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const PRIMARY_LINKS = [{ to: "/", label: "Home" }];

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [signedInUser, setSignedInUser] = useState(false);
  const isHomePage = location.pathname.toLowerCase() === "/";
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    setSignedInUser(Boolean(localStorage.getItem("signedInUser")));
  }, [location.pathname]);

  const applySearch = (nextValue) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextValue.trim()) {
      nextParams.set("search", nextValue);
    } else {
      nextParams.delete("search");
    }

    if (!isHomePage) {
      navigate(`/?${nextParams.toString()}`);
      return;
    }

    setSearchParams(nextParams);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    applySearch(searchValue);
  };

  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-md glass-navbar">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <span className="navbar-brand-copy">
              <span className="navbar-brand-title">ANIMEWORLD</span>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-target="#navbarcollapse"
            data-bs-toggle="collapse"
            aria-controls="navbarcollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarcollapse">
            <div className="navbar-nav">
              {PRIMARY_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="nav-link text-dark">
                  {link.label}
                </Link>
              ))}
            </div>
            <form
              className="navbar-search-wrap navbar-search-form mx-md-4 my-3 my-md-0"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="search"
                className="form-control glass-input navbar-search-input"
                placeholder="Search products..."
                value={searchValue}
                onChange={handleSearchChange}
              />
              <button type="submit" className="btn navbar-search-btn text-dark">
                Search
              </button>
            </form>
            <div className="navbar-auth-links d-flex align-items-center gap-2 me-md-3 mb-3 mb-md-0">
              {signedInUser ? (
                <Link
                  to="/signout"
                  className="btn navbar-auth-btn navbar-auth-btn-secondary text-dark"
                >
                  Sign out
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn navbar-auth-btn navbar-auth-btn-secondary text-dark"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/signin"
                    className="btn navbar-auth-btn navbar-auth-btn-primary text-dark"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
            <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-2 navbar-actions">
              <Link to="/cart" className="nav-link position-relative">
                <i className="fas fa-shopping-cart"></i>🛒
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
