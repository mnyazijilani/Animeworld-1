import React from 'react'

const Footer = () => {
  return (
    <div>
        <section
          className="row p-3 footer-hero"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(6, 10, 24, 0.78), rgba(6, 10, 24, 0.9)), url(/anime-backgrounds/background35.jpeg)',
          }}
        >
		<div className="col-md-4">
			<h2 className="text-center text-light">About us</h2>
			<p className="text-light fst-italic">
        AnimeWorld brings together standout anime-inspired picks and a simple shopping experience for fans who want to browse, save, and buy quickly.
			</p>
		</div>
		<div className="col-md-4">
			<h2 className="text-light text-center">Contact us</h2>
			<form action="" className="glass-form-layout footer-contact-form">
				<input type="email" placeholder="Enter your email " className="form-control glass-input footer-glass-input"/>
				<textarea name="" id="" className="form-control glass-input footer-message-box footer-glass-input" placeholder="Leave a comment"></textarea>
				<input type="submit" value="Send Message" className="btn glass-submit-btn footer-submit-btn"/>
			</form>
		</div>
		<div className="col-md-4">
			<h2 className="text-center text-light">Stay connected</h2>
			<a href="https://facebook.com">
				<img src="/images/fb.png" alt="Facebook" width="50" height="50" />
			</a>
			<a href="https://instagram.com">
				<img src="/images/in.png" alt="Instagram" width="50" height="50"/>
			</a>
			<a href="https://x.com">
				<img src="/images/x.png" alt="X" width="50" height="50"/>
			</a>
			<p className="text-light">You can get in touch with us on our social media platforms at @AnimeWorld.</p>
		</div>
	</section>
    <footer className="p-3 text-center text-light footer-bottom">
		<b className="fst-italic fw-semibold">Developed by Hildah &copy; 2026. All Rights Reserved</b>
	</footer>
    </div>

  )
}

export default Footer
