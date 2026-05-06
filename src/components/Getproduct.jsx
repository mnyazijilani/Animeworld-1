import React,{useState , useEffect} from 'react' ;
import axios from'axios'
import Carousel from './Carousel';
import {useNavigate} from 'react-router-dom' ;
import Footer from './Footer';
import Chatbot from './Chatbot';

const Getproducts = () => {
  const navigate=useNavigate()
  // declare the states here 
  const [loading,setLoading]=useState("")
  const[products,setProducts]=useState([])
  const[error,setError]=useState ("")
  const[search,setSearch]=useState("")
  const [cart, setCart] = useState([])
  const[visibleCount, setVisibleCount]=useState(8);
  const getproducts=async()=>{
   setLoading("Please wait...")
   try{
     const response=await axios.get ("https://hildahmbuni.alwaysdata.net/api/getproducts")
     setProducts(response.data)
     setLoading("")

   }catch (error){
   setError("Something went wrong")
   setLoading("")
  }}
 //  call the function 
 useEffect(()=>{
 getproducts()
} , [])
// reset visible count when category changes 
useEffect(()=>{
 setVisibleCount(8)
 }, []);
// load cart from localStorage (on mount)
useEffect(() => {
 const savedCart = JSON.parse(localStorage.getItem("cart"));
 if (savedCart) {
   setCart(savedCart);
 }
},[]);

// Save cart to localStorage whenever it changes
useEffect(() => {
 localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);




const imagepath="https://hildahmbuni.alwaysdata.net/static/images/"
// filter products 
const filtered_products=products.filter((item)=>
item.product_name.toLowerCase().includes(search.toLowerCase())||
item.product_description.toLowerCase().includes(search.toLowerCase())
);const addToCart = (product) => {
 const existingItem = cart.find((item) => item.product_id === product.product_id);

 if (existingItem) {
   const updatedCart = cart.map((item) =>
     item.product_id === product.product_id
       ? { ...item, quantity: item.quantity + 1 }
       : item
   );
   setCart(updatedCart);
 } else {
   setCart([...cart, { ...product, quantity: 1 }]);
 }
};


 return (
   <div className='row'>
     {/* carousel goes here  */}
     <Carousel />

     {/* navbar goes here  */}
     <h1 className='text-danger'>Available products</h1>
     <div className="classname row justify-content-center mt-3 mb-3">
       <input
       className='form-control w-50'
       type='search'
       placeholder='Search product...'
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
       />
     </div>
     <h5 className='text-success text-center'>Cart Items: {cart.length}</h5>
     {/* bind the states */}
     <h2 className='text-primary'>{loading}</h2>
     <h2 className='text-warning'>{error}</h2>
    
     {/* map the products  */}
     { filtered_products.slice(0,visibleCount).map((singleproduct)=>(
       
       <div className="col-md-3 mb-4" key={singleproduct.product_id}>
         <div className="card shadow  h-100 bg-primary">
           <img src= {imagepath + singleproduct.product_photo} alt=""  style={{height:"200px"}}/>
           <div className="card-body">
             <h1 className='text-info'>{singleproduct.product_name}</h1>
             <p>{singleproduct.product_description}</p>
             <b>Ksh {singleproduct.product_cost}</b><br />
             <button className='btn btn-dark'onClick={()=>navigate("/makepayment",{state:{singleproduct}})}>Purchase Now</button>
             <button
 className='btn btn-success mt-2'
 onClick={() => addToCart(singleproduct)}
>
 Add to Cart
</button>

           </div>
         </div>
       </div>
     ))}
     {/*  load more button goes here  */}
{visibleCount< filtered_products.length &&(
 <div className='text-center mt-4'>
 <button
 className='btn btn-primary'
 onClick={()=>setVisibleCount(visibleCount+8)}
 >
 Load More
 </button>
 </div>
)}
     {/* footer goes here  */}
     <Footer/>
     {/* Chatbot goes here  */}
     <Chatbot/>
   </div>
 )
}


export default Getproducts
  

  
  
