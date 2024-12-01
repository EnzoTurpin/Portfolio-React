import React, { useEffect, useRef } from "react";

const ScrollToTopButton = () => {
  const scrollToTopBtn = useRef(null);

  useEffect(() => {
    // Fonction pour afficher ou masquer le bouton selon le scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        if (scrollToTopBtn.current) {
          scrollToTopBtn.current.style.display = "flex";
        }
      } else {
        if (scrollToTopBtn.current) {
          scrollToTopBtn.current.style.display = "none";
        }
      }
    };

    // Fonction pour remonter en haut de la page lorsqu'on clique sur le bouton
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Ajout des écouteurs d'événements si le bouton est monté
    if (scrollToTopBtn.current) {
      window.addEventListener("scroll", handleScroll);
      scrollToTopBtn.current.addEventListener("click", scrollToTop);
    }

    // Nettoyage des écouteurs d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollToTopBtn.current) {
        scrollToTopBtn.current.removeEventListener("click", scrollToTop);
      }
    };
  }, []);

  return (
    <button
      ref={scrollToTopBtn}
      id="scrollToTopBtn"
      aria-label="Retour en haut"
      style={{
        display: "none",
        position: "fixed",
        width: "50px",
        height: "50px",
        backgroundColor: "var(--color-dark)",
        color: "var(--color-light)",
        cursor: "pointer",
        fontSize: "1.25rem",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 2px 5px var(--color-shadow-dark)",
        transition: "opacity 0.3s",
        zIndex: 3,
        borderRadius: "50%",
        border: "2px solid white",
        right: "20px",
        bottom: "20px",
      }}
    >
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Icône flèche vers le haut, retour en haut"
      >
        <path
          d="M12 4L12 20M12 4L6 10M12 4L18 10"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
