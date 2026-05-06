import React from 'react'

const Footer = () => {
  return (
    <div>
        <section class="row  bg-dark p-3">
		{/* <!-- child 1 --> */}
		<div class="col-md-4">
			<h2 class="text-center text-light">About us</h2>
			<p class="text-light fst-italic">
			</p>
		</div>
		{/* <!-- child 2 --> */}
		<div class="col-md-4">
			<h2 class="text-light text-center">Contact us</h2>
			<form action="">
				<input type="email" placeholder="Enter your email " class="form-control"/><br/><br/>
				<textarea name="" id="" class="form-control" placeholder="Leave a comment"></textarea><br/><br/>
				<input type="submit" value="Send Message" class="btn btn-outline-light"/>
			</form>
		</div>
		{/* <!-- child 3 --> */}
		<div class="col-md-4">
			<h2 class="text-center text-light">Stay connected</h2>
			<a href="https:/facebook.com">
				<img src="images/fb.png" alt="fb" width="50px" height="50px" />
			</a>
			<a href="https:/instagram.com">
				<img src="images/in.png" alt="ig" width="50px" height="50px"/>
			</a>
			<a href="https:/x.com">
				<img src="images/x.png" alt="x" width="50px" height="50px"/>
			</a>
			<p class="text-light">You can get in touch with us at our social media platform @shoe palace</p>
		</div>
	</section>
    <footer class="p-3 text-center bg-dark text-light">
		<b class="fst-italic fw-semibold">Developed by Hildah &copy; 2026. All Rights Reserved</b>
	</footer>
    </div>

  )
}

export default Footer