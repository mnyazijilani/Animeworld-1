import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Carousel from "./Carousel";
import { useCart } from "../contexts/CartContext";
import { filterProductsBySearch } from "./movieSections";

const animeThemes = [
  {
    title: "Attack on Titan",
    accent: "theme-titan",
    emoji: "⚔️",
    mood: "War-torn, intense, and relentless.",
    description:
      "A darker world of sacrifice, survival, and the price of freedom.",
  },
  {
    title: "Demon Slayer",
    accent: "theme-slayer",
    emoji: "👹",
    mood: "Fiery, emotional, and heroic.",
    description: "A vivid mix of heart, sword fights, and unforgettable bonds.",
  },
  {
    title: "Suzume",
    accent: "theme-suzume",
    emoji: "🌅",
    mood: "Dreamy, reflective, and beautiful.",
    description:
      "A softer cinematic atmosphere built around healing, memory, and wonder.",
  },
];

const Getproduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { addToCart } = useCart();
  // declare the states here
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const getproducts = async () => {
    setLoading("Please wait...");
    try {
      const response = await axios.get(
        "https://hildahmbuni.alwaysdata.net/api/getproducts",
      );
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError("Something went wrong");
      setLoading("");
    }
  };
  //  call the function
  useEffect(() => {
    getproducts();
  }, []);
  // reset visible count when category changes
  useEffect(() => {
    setVisibleCount(8);
  }, []);
  const imagepath = "https://hildahmbuni.alwaysdata.net/static/images/";
  const search = searchParams.get("search") || "";

  const getRankMeta = (index) => {
    const rank = index + 1;

    if (rank === 1) {
      return { badge: "Top 1", accent: "top-rank-gold", rating: 5.0 };
    }

    if (rank === 2) {
      return { badge: "Top 2", accent: "top-rank-silver", rating: 4.8 };
    }

    if (rank === 3) {
      return { badge: "Top 3", accent: "top-rank-bronze", rating: 4.7 };
    }

    return {
      badge: `Rank #${rank}`,
      accent: "top-rank-default",
      rating: Math.max(4.1, 4.6 - index * 0.05).toFixed(1),
    };
  };
  // filter products
  const filtered_products = filterProductsBySearch(products, search);

  const renderProductCard = (singleproduct, index, extraClass = "") => {
    const rankMeta = getRankMeta(index);

    return (
      <div
        className={`col-md-3 mb-4 ${extraClass}`.trim()}
        key={`${singleproduct.product_id}-${extraClass || "grid"}`}
      >
        <div className="card shadow h-100 product-ranking-card product-card-dark">
          <div className={`product-rank-badge ${rankMeta.accent}`}>
            {rankMeta.badge}
          </div>
          <img
            src={imagepath + singleproduct.product_photo}
            alt={singleproduct.product_name}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <div className="product-rating-row">
              <span className="product-stars">★★★★★</span>
              <span className="product-rating-score">{rankMeta.rating}</span>
            </div>
            <h1 className="text-info">{singleproduct.product_name}</h1>
            <p>{singleproduct.product_description}</p>
            <b>Ksh {singleproduct.product_cost}</b>
            <br />
            <button
              className="btn btn-dark mb-2"
              onClick={() =>
                navigate("/makepayment", { state: { singleproduct } })
              }
            >
              Purchase Now
            </button>
            <br />
            <button
              className="btn btn-dark mb-2 add-to-cart-btn"
              onClick={() => addToCart(singleproduct)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="row text-dark">
      {/* carousel goes here  */}
      <Carousel />

      <div className="home-section-nav-wrap">
        <div className="home-section-nav">
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/sad")}
          >
            Sad Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/horror")}
          >
            Horror Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/latest")}
          >
            Latest Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/beginner")}
          >
            Beginner Picks
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/scifi")}
          >
            Sci-Fi Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/romantic")}
          >
            Romantic Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/adventure")}
          >
            Adventure Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/action")}
          >
            Action Movies
          </button>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/movies/fantasy")}
          >
            Fantasy Movies
          </button>
        </div>
      </div>

      {/* bind the states */}
      <h2 className="text-primary">{loading}</h2>
      <h2 className="text-warning">{error}</h2>

      {/* map the products  */}
      {filtered_products
        .slice(0, visibleCount)
        .map((singleproduct, index) => renderProductCard(singleproduct, index))}
      {/*  load more button goes here  */}
      {visibleCount < filtered_products.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setVisibleCount(visibleCount + 8)}
          >
            Load More
          </button>
        </div>
      )}

      <section className="col-12 anime-theme-hero">
        <div className="anime-theme-intro">
          <span className="anime-theme-eyebrow">Featured Worlds</span>
          <h1 className="anime-theme-title">
            Attack on Titan, Demon Slayer, and Suzume set the tone here.
          </h1>
          <p className="anime-theme-copy">
            AnimeWorld leans into action, emotion, and cinematic wonder with a
            homepage inspired by these three standout stories.
          </p>
        </div>
        <div className="row justify-content-center">
          {animeThemes.map((theme) => (
            <div className="col-md-4 mb-4" key={theme.title}>
              <div className={`anime-theme-card ${theme.accent}`}>
                <div className="anime-theme-symbol">{theme.emoji}</div>
                <h2 className="anime-theme-card-title">{theme.title}</h2>
                <p className="anime-theme-mood">{theme.mood}</p>
                <p className="anime-theme-description">{theme.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* footer goes here  */}
      <Footer />
    </div>
  );
};

export default Getproduct;
