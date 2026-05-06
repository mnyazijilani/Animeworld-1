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
      const response= await axios.post("http://hildahmbuni.alwaysdata.net/api/signup",formdata)
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
      <div className='col-md-6 card shadow '>
        <h1>🐉Signup</h1>
        {/* bind the states */}
        <h2 className="text-warning"> {loading}</h2>
        <h2 className="text-success">{success}</h2>
        <h2 className='text-primary'>{error}</h2>
        <form action=""  onSubmit={handlesubmit}> 
          <input type="text" className="form-control" placeholder='Enter Username 🧑🏽' onChange={(e) =>setUsername(e.target.value)} /> <br />
          <input type="email" className="form-control" placeholder='Enter Email ✉️'onChange={(e)=>setEmail(e.target.value)} /> <br />
          <input type="password"
           className="form-control"
            placeholder='Enter Password 👁️'
            onChange={(e)=>{
              setPassword(e.target.value);
               checkPasswordStrength(e.target.value);
            }}  /><br />
          {/* step 4 goes here  */}
          {password &&(
            <p
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
          <input type="number" className="form-control" placeholder='Enter Phone 📱'onChange={(e)=>setPhone(e.target.value)}  /> <br />
        <button  type="submit" className='btn btn-primary col-md-12'>Sign Up</button> <br />
        </form> 
        <p>Already you have an account?<Link to="/signin">Signin</Link></p>
      </div>

    </div>
  )
}

export default Signup