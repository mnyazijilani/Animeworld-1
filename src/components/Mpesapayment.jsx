import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"

const Mpesapayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { singleproduct, cartItems = [], totalPrice } = location.state || {};
  const product = singleproduct || cartItems[0];
  const amount = singleproduct ? singleproduct.product_cost : totalPrice;
  const imagepath="https://hildahmbuni.alwaysdata.net/static/images/"
 
  // declare the state 
  const [phone, setPhone] =useState("")

  // 3 states of posting data 
  const [loading,setLoading] =useState("")
  const [success,setSuccess] =useState("")
  const [error,setError] =useState("")

  // function to make payment 
  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")
     // create a   digital envelope to store user inputs 
    
    const formdata = new FormData ()

    formdata.append ("amount" , amount)
    formdata.append ("phone", phone)

    try {
      const response = await axios.post("https://hildahmbuni.alwaysdata.net/api/mpesa_payment" , formdata)
      setSuccess(response.data.message)
      setLoading("")
      
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  
  }

  if (!product || !amount) {
    return (
      <div className='row justify-content-center'>
        <div className="col-md-8">
          <div className="glass-form-card shadow-lg p-4 p-md-5 text-center">
          <span className="glass-form-eyebrow">Payment</span>
          <h1 className='glass-form-title'>Make payment - Lipa na Mpesa</h1>
          <p className='glass-form-subtitle text-danger'>No product or cart information was provided for payment.</p>
          <button type="button" className='btn btn-primary glass-submit-btn' onClick={() => navigate('/')}>
            Back to products
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className='row justify-content-center'>
      <div className="col-md-8">
        <div className="glass-form-card shadow-lg p-4 p-md-5">
        <span className="glass-form-eyebrow">Secure Checkout</span>
        <h1 className='glass-form-title'>Make payment - Lipa na Mpesa</h1>
        <p className="glass-form-subtitle">A quick, polished checkout flow for your AnimeWorld order.</p>

        <div className="glass-payment-summary mb-4">
          <img
            src={ imagepath + product.product_photo}
            alt={product.product_name}
            className="glass-payment-image"
          />

          <div className="glass-payment-copy">
            <h5 className='glass-payment-name'>{singleproduct ? product.product_name : `Cart checkout (${cartItems.length} items)`}</h5>
            <p className='glass-payment-description'>{singleproduct ? product.product_description : 'Complete your M-Pesa payment for the items currently in your cart.'}</p>
            <b className='glass-payment-amount'>Ksh {amount}</b>
          </div>
        </div>

        <h2 className='text-warning'>{loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>

        <form action="" onSubmit={handlesubmit} className="glass-form-layout">
          <input
            type="number"
            className='form-control glass-input'
            placeholder='Enter Phone 254XXXX'
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type='submit' className='btn btn-success w-100 glass-submit-btn'>Make payment</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Mpesapayment;
