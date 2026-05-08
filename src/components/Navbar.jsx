import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar = () => {
	const{cartCount}=useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const signedInUser = localStorage.getItem('signedInUser');
  const searchValue = searchParams.get('search') || '';
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('signedInUser');
    navigate('/signin');
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (nextValue.trim()) {
      nextParams.set('search', nextValue);
    } else {
      nextParams.delete('search');
    }

    if (!isHomePage) {
      navigate(`/?${nextParams.toString()}`);
      return;
    }

    setSearchParams(nextParams);
  };

  return (
     <section className="row">
			<div className="col-md-12">
				<nav className="navbar navbar-expand-md bg-light text-dark">
					<Link to="/" className="navbar-brand text-dark d-flex align-items-center gap-2">
            <span className="navbar-brand-copy">
              <span className="navbar-brand-title">ANIMEWORLD</span>
              <span className="navbar-brand-tag">otaku market</span>
            </span>
          </Link>
					<button className="navbar-toggler" type="button" data-bs-target="#navbarcollapse" data-bs-toggle="collapse" aria-controls="navbarcollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarcollapse">
						<div className="navbar-nav">
							<Link to="/" className="nav-link text-dark">Home</Link>
							<Link to="/addproduct" className="nav-link text-dark">Add product</Link>
							<Link to="/signup" className="nav-link text-dark">Sign up</Link>
							{!signedInUser && (
								<Link to="/signin" className="nav-link text-dark">Sign in</Link>
							)}
						</div>
            <div className="navbar-search-wrap mx-md-4 my-3 my-md-0">
              <input
                type="search"
                className="form-control glass-input navbar-search-input"
                placeholder="Search products..."
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
						<div className='navbar-nav ms-auto d-flex flex-row align-items-center gap-2 navbar-actions'>
							<Link to="/cart" className='nav-link position-relative'>
							<i className='fas fa-shopping-cart'></i>🛒{cartCount >0&&(
								<span className='badge bg-danger position-absolute top-0 start-100 translate-middle'>
									{cartCount}
								</span>
							)}</Link>
              {signedInUser && location.pathname !== '/signin' && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
						</div>
					</div>
				</nav>
			</div>
		</section>

  )
}

export default Navbar
