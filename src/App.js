
import './App.css';



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter , Routes ,Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Getproduct from './components/Getproduct';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
    
   
    <div className="App">
      {/* navbar goes here  */}
      <Navbar/>
      <header className="App-header">
        <h1 className='text-light'>Welcome to AnimeWorld</h1>
        
      </header>
      {/* <nav>
        <Link to="/" className='btn btn-success m-1'>Get Products</Link>
        <Link to="/Signup" className='btn btn-success m-1'>Signup</Link>
        <Link to="/Signin" className='btn btn-success m-1'>Signin</Link>
        <Link to="/Addproduct" className='btn btn-success m-1'>Addproduct</Link>
      </nav>  */}
      <Routes>
        <Route path="/" element={<Getproduct/>} />
        <Route path="/Signup"element={<Signup/>} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/addproduct"element={<Addproduct/>} />
        <Route path="/makepayment"element={<Mpesapayment/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
