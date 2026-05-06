import React from 'react'

const Carousel = () => {
  return (
    // <!-- carousel goes here  -->
		<section class="row">
			<div class="col-md-12">
				<div id="carouselExampleCaptions" class="carousel slide">
					<div class="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
							class="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
							aria-label="Slide 2"></button>
						<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
							aria-label="Slide 3"></button>
					</div>
					<div class="carousel-inner">
						<div class="carousel-item active">
							<img src="images/0bc1fed92a03bfed5ec93bb536e3e551.jpg" class="d-block w-100" height="300px" alt="..."/>
							<div class="carousel-caption d-none d-md-block">
								<h5 class="text-warning">DEMON SLAYER👹</h5>
								<p class="text-warning">Demon Slayer: Kimetsu no Yaiba is a story about Tanjiro Kamado, a kind boy who becomes a demon slayer after his family is slaughtered and his sister is turned into a demon, as he fights to save her and end the threat of demons.
</p>
							</div>
						</div>
						<div class="carousel-item">
							<img src="public/images/bgsignin.jpg" alt="" width="100px" height="300px" />
							<div class="carousel-caption d-none d-md-block">
								<h5 class="text-danger">SUZUME🌅</h5>
								<p class="text-danger">Suzume follows a girl who journeys across Japan to close mysterious doors that unleash disasters, while confronting grief, memory, and healing from past trauma.
</p>
							</div>
						</div>
						<div class="carousel-item">
							<img src="public/images/bgmakepayment" class="d-block w-100" height="300px" alt="..." />
							<div class="carousel-caption d-none d-md-block">
								<h5 class="text-dark">ATTACK ON TITAN</h5>
								<p class="text-dark">The Attack Titan is the sorrowful curse of freedom, forcing its holder to keep fighting a battle that can never truly end.
</p>
							</div>
						</div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
						data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
						data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</section>
  )
}

export default Carousel