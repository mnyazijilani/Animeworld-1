import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Signin = () => {
  const[email,setEmail]=useState("")
  const[password,setPassword]= useState("") 
  // hook to inform user
  const[loading,setLoading]=useState("")  

  const[error,setError]=useState("")
  // function to pragrammatically redirect to a different component using path 
  const navigate = useNavigate()
  
  // function to handle signin 
  const submit=async(e)=>{
    e.preventDefault()  
    // prevent default actions-reload 
    // console.log("signed in success")
    setLoading ("Please wait as we sign you in...")
    try {
      // prepare our data using the FormData object 
      // FormData allows storong of key-value pairs by use of methods append
      const data =new FormData() 
      data.append("email",email)
      data.append("password",password)
      // sending post request to oyr flask api endpoint 
      // axios is a library tjat helps in sending of different https requests ei post/get...
      // await is used in asynchronous functions to pause for sometimes until the response has been received  
      // response-anytime you make a request to server we will always have a response which will be stored in the response variable 
      const response = await axios.post("https://hildahmbuni.alwaysdata.net/api/signin" ,data)
      setLoading("")
      // check if successful by use of the response 
      if(response.data.user){
      localStorage.setItem("signedInUser", JSON.stringify(response.data.user))
// redirect to get products componenet
      navigate("/")
      }else{
        setError(response.data.message)
      }
      
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
return(
  <div className='row mt-4 justify-content-center'>
    <div className='col-md-6'>
      <div className='glass-form-card shadow-lg text-center p-4 p-md-5'>
        <span className="glass-form-eyebrow">Welcome Back</span>
        <h1 className='glass-form-title'>Sign In</h1>
        <p className="glass-form-subtitle">Step back into AnimeWorld and pick up where you left off.</p>
        <h5 className='text-info'>{loading}</h5>
        <h5 className="text-danger">{error}</h5>
        <form onSubmit={submit} className="glass-form-layout"> 
          <input type="email" className="form-control glass-input" placeholder='Enter Email 📧'required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" className="form-control glass-input" placeholder='Enter Password 🔒' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button  type="submit" className='btn btn-primary col-md-12 glass-submit-btn'>Sign In</button>
        </form>
        <p className="glass-form-footer">Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
      </div>
    </div>
)

      
    
  
}

export default Signin
