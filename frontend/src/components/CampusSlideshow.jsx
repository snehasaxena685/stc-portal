import React, { useEffect, useState } from "react";

export default function CampusSlideshow() {
  const campusSlides = [
    {
      img: "/images/Mansion_pic.jpg",
      caption: "CSIR–CFTRI Main Campus, Mysuru",
    },
    {
      img: "/images/banner1.jpg",
      caption: "CFTRI Research & Training Facilities",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) =>
        prev === campusSlides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [campusSlides.length]);

  return (
    <section className="campus-shell fade">
      <div className="campus-frame">
        <div className="slideshow-container">
          {campusSlides.map((s, i) => (
            <div
              key={i}
              className={`slide ${i === slideIndex ? "active" : ""}`}
            >
              <img src={s.img} alt={s.caption} />
              <div className="slide-caption">{s.caption}</div>
            </div>
          ))}

          {/* Prev */}
          <span
            className="slide-prev"
            onClick={() =>
              setSlideIndex(
                slideIndex === 0
                  ? campusSlides.length - 1
                  : slideIndex - 1
              )
            }
          >
            ❮
          </span>

          {/* Next */}
          <span
            className="slide-next"
            onClick={() =>
              setSlideIndex(
                slideIndex === campusSlides.length - 1
                  ? 0
                  : slideIndex + 1
              )
            }
          >
            ❯
          </span>

          {/* Dots */}
          <div className="slide-dots">
            {campusSlides.map((_, i) => (
              <span
                key={i}
                className={`slide-dot ${i === slideIndex ? "active" : ""}`}
                onClick={() => setSlideIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
