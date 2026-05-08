import React, { useEffect, useRef } from "react";
import BootstrapCarousel from "bootstrap/js/dist/carousel";

const slides = [
  {
    image: "/anime-backgrounds/background35.jpeg",
    title: "DEMON SLAYER",
    emoji: "👹",
    textClass: "text-light",
    description:
      "Demon Slayer: Kimetsu no Yaiba follows Tanjiro Kamado as he becomes a demon slayer after tragedy strikes his family and his sister is transformed into a demon.",
  },
  {
    image: "/anime-backgrounds/bg36.jpeg",
    title: "SUZUME",
    emoji: "🌅",
    textClass: "text-light",
    description:
      "Suzume follows a girl crossing Japan to close mysterious doors that unleash disasters while confronting grief, memory, and healing.",
  },
  {
    image: "/anime-backgrounds/backgroundimage 34.jpeg",
    title: "ATTACK ON TITAN",
    emoji: "⚔️",
    textClass: "text-light",
    description:
      "Attack on Titan explores freedom, sacrifice, and survival in a world where humanity fights to endure against overwhelming enemies.",
  },
];

const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current) {
      return undefined;
    }

    const carousel = new BootstrapCarousel(carouselRef.current, {
      interval: 3000,
      ride: "carousel",
      pause: false,
      wrap: true,
    });

    carousel.cycle();

    return () => {
      carousel.dispose();
    };
  }, []);

  return (
    <section className="row mb-4">
      <div className="col-md-12">
        <div
          id="carouselExampleCaptions"
          ref={carouselRef}
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="false"
        >
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner rounded shadow overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={`carousel-item${index === 0 ? " active" : ""}`}
              >
                <img
                  src={slide.image}
                  className="d-block w-100"
                  height="380"
                  alt={slide.title}
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded px-3 py-2">
                  <h5 className={slide.textClass}>
                    {slide.title}
                    {slide.emoji}
                  </h5>
                  <p className={slide.textClass}>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
