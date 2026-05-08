import React, { useState } from "react";
import axios from "axios";

const Addproduct = () => {
  // declare the states here
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  // Define three states for posting data
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  // function to handle submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");
    const formdata = new FormData();
    formdata.append("product_name", product_name);
    formdata.append("product_description", description);
    formdata.append("product_cost", product_cost);
    formdata.append("product_photo", product_photo);
    try {
      const response = await axios.post(
        "https://hildahmbuni.alwaysdata.net/api/add_product",
        formdata,
      );
      setSuccess(response.data.message);
      // update setLoading
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };
  return (
    <div className="row mt-1 justify-content-center">
      <div className="col-md-6">
        <div className="glass-form-card shadow-lg p-4 p-md-5 text-dark">
          <span className="glass-form-eyebrow">New Drop</span>
          <h1 className="glass-form-title">Add Product</h1>
          <p className="glass-form-subtitle">
            Upload a fresh item with a polished admin form that matches the rest
            of the site.
          </p>
          <h2 className="text-warning"> {loading}</h2>
          <h2 className="text-success">{success}</h2>
          <h2 className="text-danger">{error}</h2>

          <form
            action=""
            onSubmit={handlesubmit}
            className="text-start glass-form-layout"
          >
            <label className="glass-label">Product Name</label>
            <input
              type="text"
              className="form-control glass-input"
              onChange={(e) => setProductName(e.target.value)}
            />
            <label className="glass-label">Description</label>
            <input
              type="text"
              className="form-control glass-input"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="glass-label">Cost (Ksh)</label>
            <input
              type="text"
              className="form-control glass-input"
              onChange={(e) => setProductCost(e.target.value)}
            />
            <label className="glass-label">Product Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control glass-input glass-file-input"
              placeholder="No File Chosen"
              onChange={(e) => setProductPhoto(e.target.files[0])}
            />
            <button
              type="submit"
              className="btn btn-primary col-md-12 glass-submit-btn"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Addproduct;
