import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import { useCart } from "../contexts/CartContext";
import {
  filterProductsBySearch,
  getMovieSectionItems,
  movieSectionDefinitions,
} from "./movieSections";

const MovieCategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const imagepath = "https://hildahmbuni.alwaysdata.net/static/images/";
  const search = searchParams.get("search") || "";
  const section = movieSectionDefinitions[category];

  useEffect(() => {
    const getproducts = async () => {
      setLoading("Please wait...");
      try {
        const response = await axios.get(
          "https://hildahmbuni.alwaysdata.net/api/getproducts",
        );
        setProducts(response.data);
        setLoading("");
      } catch (fetchError) {
        setError("Something went wrong");
        setLoading("");
      }
    };

    getproducts();
  }, []);

  const filteredProducts = filterProductsBySearch(products, search);
  const sectionItems = section
    ? getMovieSectionItems(filteredProducts, category)
    : [];

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

  const renderProductCard = (singleproduct, index) => {
    const rankMeta = getRankMeta(index);

    return (
      <div
        className="col-md-3 mb-4"
        key={`${singleproduct.product_id}-${index}`}
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
              className="btn btn-success mb-2"
              onClick={() => addToCart(singleproduct)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!section) {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="text-danger">Movie Section Not Found</h1>
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="row">
      <section className="movie-section-block col-12 mb-4">
        <div className="movie-section-header">
          <h1 className="movie-section-title">{section.title}</h1>
          <p className="movie-section-copy">{section.description}</p>
        </div>
        <div className="text-center mb-4">
          <button
            type="button"
            className="btn home-section-btn"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </section>

      <h2 className="text-primary">{loading}</h2>
      <h2 className="text-warning">{error}</h2>

      {sectionItems.length > 0 ? (
        sectionItems.map((singleproduct, index) =>
          renderProductCard(singleproduct, index),
        )
      ) : (
        <p className="text-light text-center">
          No movies found in this section yet.
        </p>
      )}

      <Footer />
    </div>
  );
};

export default MovieCategoryPage;
