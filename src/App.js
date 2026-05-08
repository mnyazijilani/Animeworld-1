import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Signin from './components/Signin';
import Signout from './components/Signout';
import Signup from './components/Signup';
import Getproduct from './components/Getproduct';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import MovieCategoryPage from './components/MovieCategoryPage';
import { CartProvider } from './contexts/CartContext';
import { resolveBackgroundImage } from './components/backgroundimages';

function AppShell() {
  const location = useLocation();
  const backgroundImage = resolveBackgroundImage(location.pathname);

  return (
    <div
      className="App page-shell"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <Navbar />
        <header className="App-header">
          <h1 className="text-light">Welcome to AnimeWorld</h1>
        </header>
        <main className="page-content container-fluid">
          <Routes>
            <Route path="/" element={<Getproduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/makepayment" element={<Mpesapayment />} />
            <Route path="/movies/:category" element={<MovieCategoryPage />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </CartProvider>
  );
}

export default App;
