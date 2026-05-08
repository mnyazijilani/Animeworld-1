import axios from 'axios'
import React , {useState}from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  // declare the states here  
  const[username,setUsername] =useState ("")
  const[email,setEmail] =useState ("")
  const[password ,setPassword] =useState ("")
  const[phone ,setPhone] =useState("")
  // define three states for hosting data \
  const[loading , setLoading]=useState("")
  const[success , setSuccess]=useState("")
  const[error ,setError]=useState("")
  const[strength,setStrength]=useState("");
  // Function to signup the user
  const handlesubmit =async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")
    //  create digital envelop to install user inputs 
    // NB:its empty and we need to append / (add/attach)
    const formdata= new FormData()
    formdata.append("username",username)
    formdata.append("email" ,email)
    formdata.append("password" ,password)
    formdata.append("phone", phone)
    try {
      const response= await axios.post("https://hildahmbuni.alwaysdata.net/api/signup",formdata)
      setSuccess(response.data.message)
      // update setLoading 
      setLoading ("")
    } catch (error) {
      setError(error.message)
      setLoading("")
      
    }
  }
  const checkPasswordStrength=(password)=>{
  if (password.length <4){
    setStrength("Weak");
  }
   else if (password.length <8){
    setStrength("Medium");
   }
   else{
    setStrength("Strong");
   }
};


  return (
    <div className='row mt-1 justify-content-center'>
      <div className='col-md-6'>
        <div className='glass-form-card shadow-lg p-4 p-md-5'>
        <span className="glass-form-eyebrow">Join The World</span>
        <h1 className='glass-form-title'>🐉 Signup</h1>
        <p className="glass-form-subtitle">Create your account and start building your anime-inspired collection.</p>
        <h2 className="text-warning"> {loading}</h2>
        <h2 className="text-success">{success}</h2>
        <h2 className='text-primary'>{error}</h2>
        <form action=""  onSubmit={handlesubmit} className="glass-form-layout"> 
          <input type="text" className="form-control glass-input" placeholder='Enter Username 🧑🏽' onChange={(e) =>setUsername(e.target.value)} />
          <input type="email" className="form-control glass-input" placeholder='Enter Email ✉️'onChange={(e)=>setEmail(e.target.value)} />
          <input type="password"
           className="form-control glass-input"
            placeholder='Enter Password 👁️'
            onChange={(e)=>{
              setPassword(e.target.value);
               checkPasswordStrength(e.target.value);
            }}  />
          {password &&(
            <p
            className="glass-strength"
            style={{
              color:
              strength==="Weak"
              ?"red"
              :strength==="Medium"
              ?"orange"
              :"green",
            }}
            >
              Password Strength :{strength}
            </p>
          )
          }
          <input type="number" className="form-control glass-input" placeholder='Enter Phone 📱'onChange={(e)=>setPhone(e.target.value)}  />
        <button  type="submit" className='btn btn-primary col-md-12 glass-submit-btn'>Sign Up</button>
        </form> 
        <p className="glass-form-footer">Already have an account? <Link to="/signin">Signin</Link></p>
      </div>
      </div>

    </div>
  )
}

export default Signup
