import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios"

const Mpesapayment = () => {

 const {singleproduct} = useLocation().state || {}

  const imagepath="http://hildahmbuni.alwaysdata.net/static/images/"
 
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

    formdata.append ("amount" , singleproduct.product_cost)
    formdata.append ("phone", phone)

    try {
      const response = await axios.post("http://hildahmbuni.alwaysdata.net/api/mpesa_payment" , formdata)
      setSuccess(response.data.message)
      setLoading("")
      
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  
  }
  return (
    <div className='row justify-content-center'>
      <h1 className='text-success'>Make payment-Lipa na Mpesa</h1>
      <div className="card shadow col-md-8 p-4">

      {/* image goes here  */}
      <img src={ imagepath + singleproduct.product_photo} alt="" style={{height:"100px" , objectFit:"cover"}} />

      <h5 className='text-success text-start'>{singleproduct.product_name}</h5>
      <p className='text-start'>{singleproduct.product_description}</p>
      <b className='text-success text-start'>Ksh {singleproduct.product_cost}</b> <br />

      {/* bin￼
Rounded
Font Family (view all on Google Fonts)
￼
Leckerli One
Font Variant
￼
Regular 400 Normal
Font Size
￼
Font Color
￼
Background Color
￼
Installation
First, use the download button to download the files listed below. Place the files in the root directory of your website.

android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
favicon.ico
site.webmanifest
Next, copy the following link tags and paste them into the head of your HTML.

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
￼Copy
Why favicon.io?
Whether you want to generate a favicon from text, from an existing image, or from an emoji we've got you covered. The favicon generator is completely free and extremely easy to use. The generated favicon will work for all browsers and multiple platforms.

Getting started with the favicon generator
The tool above will allow you to generate a favicon from text. Start by choosing one to two letters for the favicon generator. Since the favicon generator outputs very small images it's important to use few characters for maximum legibility. Once cool feature with this favicon generator is that you can copy and paste both unicode characters and emojis into the text box. This is useful for when an emoji isn't listed on the emoji favicon page. Here's an example keeping it 💯

Making the background simple
Next, select the shape of the background. There are three simple shapes available: square, circle, and rounded. These are the most common shapes used to generate a favicon. You can see examples of these shapes with ProductHunt, IndieHackers, and HackerNews.

Selecting the font for your favicon
The favicon generator uses Google Fonts which has 800+ fonts available. This is useful to match the font used on your own website. In the future there will be a dedicated font page to help you select your font. It will have filters for languages, styles, and commonly used fonts. You can edit the font size once you've selected your font. Try to take up as much space as possible.

Tailoring the colors
The last step is to select the colors. If you have the HEX values of the colors you want then you can just enter them into the input box. Otherwise you can use some of the colors that we suggest using the color picker below each input box. One cool feature is that you can use transparent backgrounds. Simply type "transparent" into the background color box. Here's an example of a favicon generated with a transparent background .

Created by: John Sorrentino
Copyright 2026

About
I built Favicon.io because creating a favicon should be a simple process. No other favicon generator or favicon creator can make a well designed favicon from text. If you like favicon.io or have a suggestion feel free to say hello. Feedback is much appreciated!

Built With
Bulma

Huebee

Twemoji

Center.js

Favicon.js

Resources
Favicon Converter

Favicon Generator

Emoji Favicons

Logo Generator

Contact
Contact Us

Twitter

Privacy Policy

Terms of Use

Discover more
Squarespace website kits
Image conversion service
Website logo templates
Favicon conversion service
Logo design services
PNG icon converter
Apple Touch Icons
Icon design service
Custom favicon creation
￼d states  */}
      <h2 className='text-warning'>{loading}</h2>
      <h2 className='text-success'>{success}</h2>
      <h2 className='text-danger'>{error}</h2>

      <form action="" onSubmit={handlesubmit}>
        <input type="number"className='form-control' placeholder='Enter Phone 254XXXX' onChange={(e) => setPhone(e.target.value)} /> <br />
        <button type='submit' className='btn btn-success w-100'>Make payment</button>
      </form>
      </div>
    </div>
  );
}

export default Mpesapayment;
