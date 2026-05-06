import React from 'react'

const Navbar = () => {
  return (
     <section class="row">
			<div class="col-md-12">
				{/* <!-- a nav with navbar content  --> */}
				<nav class="navbar navbar-expand-md bg-dark text-light">
					<a href="" class=" navbar-brand text-light">Anime World</a>
					<button class="navbar-toggler" data-bs-target="#navbarcollapse" data-bs-toggle="collapse">
						<span class="navbar-toggler-icon"></span>
					</button>
					{/* <!-- a division containg the links --> */}
					<div class="collapse navbar-collapse" id="navbarcollapse">
						<div class="navbar-nav">
							<a href="/" class="nav-link text-light">Home</a>
							<a href="/addproduct" class="nav-link text-light">Add product</a>
							<a href="/signup" class="nav-link text-light ">Sign up </a>
							<a href="/signin" class="nav-link text-light ">Sign in </a>
						</div>
					</div>
				</nav>
			</div>
		</section>

  )
}

export default Navbar