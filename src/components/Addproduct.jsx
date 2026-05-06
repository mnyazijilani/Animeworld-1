import React,{useState} from 'react'
import axios from 'axios'

const Addproduct = () => {
  // declare the states here 
  const[product_name,setProductName] = useState("")
  const[description,setDescription] = useState("")
  const[product_cost,setProductCost] = useState("")
  const[product_photo,setProductPhoto] = useState("")
  // Define three states for posting data 
  const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")
  // function to handle submit 
  const handlesubmit = async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")
    const formdata =new FormData()
    formdata.append("product_name" , product_name)
    formdata.append("product_description" , description)
    formdata.append("product_cost" , product_cost)
    formdata.append("product_photo" , product_photo)
    try{
      const response=await axios.post("https://hildahmbuni.alwaysdata.net/api/add_product",formdata)
      setSuccess(response.data.message)
      // update setLoading 
      setLoading("")
    }catch(error){
      setError(error.message)
      setLoading("")
  }
    }
  return (
    <div className='row mt-1 justify-content-center'>
      <div className='col-md-6 card shadow '>
        <h1>Add Product</h1>
        {/* bind the states here  */}
        <h2 className="text-warning"> {loading}</h2>
        <h2 className="text-success">{success}</h2>
        <h2 className='text-danger'>{error}</h2>
        
          <form action=""onSubmit={handlesubmit} className='text-start'>
            <label>Product Name</label><br />
            <input type="text" className='form-control'onChange={(e)=>setProductName(e.target.value)}/><br />
            <label>Description</label><br />
            <input type="text" className='form-control' onChange={(e)=>setDescription(e.target.value)}/><br /> <br />
            <label>Cost (Ksh)</label><br />
            <input type="text " className='form-control' onChange={(e)=>setProductCost(e.target.value)}/><br />
            <label>Product Photo</label><br />
            <input type="file" accept='image /*' className='form-control' placeholder='No File Chosen' onChange={(e)=>setProductPhoto(e.target.files[0])}/><br />
            <button  type="submit" className='btn btn-primary col-md-12'>Add Product</button> <br /> <br />
          </form>
      </div>
    </div>
  );
}
export default Addproduct
      
  


            
    