// Importation des dépendances nécessaires
import React, { useState, useEffect } from "react";

// Composant Menu pour afficher et gérer un menu avec support multilingue
const Menu = ({ changeLanguage }) => {
  // États pour gérer le menu principal, le menu des langues, les traductions, et la langue sélectionnée
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  // Chargement des traductions lors du montage du composant
  useEffect(() => {
    fetch("/translations/translations.json")
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
        const savedLanguage = localStorage.getItem("language") || "fr";
        setSelectedLanguage(savedLanguage);
        applyTranslations(savedLanguage, data);
      });
  }, []);

  // Empêche le défilement de la page lorsque le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Applique les traductions aux éléments de la page avec l'attribut `data-key`
  const applyTranslations = (lang, translationsData) => {
    document.querySelectorAll("[data-key]").forEach((element) => {
      const key = element.getAttribute("data-key");
      const translation = getNestedTranslation(translationsData, lang, key);
      if (translation) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          if (element.hasAttribute("placeholder")) {
            element.placeholder = translation;
          }
        } else {
          element.textContent = translation;
        }
      }
    });
  };

  // Récupère une traduction imbriquée en fonction d'une clé hiérarchique
  const getNestedTranslation = (translations, lang, key) => {
    return key
      .split(".")
      .reduce(
        (obj, keyPart) => (obj ? obj[keyPart] : null),
        translations[lang]
      );
  };

  // Change la langue, sauvegarde cette préférence, et met à jour la page
  const setLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setSelectedLanguage(lang);
    applyTranslations(lang, translations);
    setLanguageMenuOpen(false);
    changeLanguage(lang);
  };

  // Gère le défilement fluide vers une section spécifique
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Rendu dynamique de la liste des langues avec leurs drapeaux
  const renderLanguageList = () => {
    const languages = {
      fr: { code: "FR", flag: "/svg/flag_fr.svg" },
      en: { code: "EN", flag: "/svg/flag_en.svg" },
      es: { code: "ES", flag: "/svg/flag_es.svg" },
    };

    return (
      <ul
        className={`absolute top-full left-0 w-full bg-gray-800 text-white rounded-md ${
          languageMenuOpen ? "block" : "hidden"
        }`}
      >
        {Object.entries(languages)
          .filter(([lang]) => lang !== selectedLanguage)
          .map(([lang, { code, flag }]) => (
            <li
              key={lang}
              className="py-2 px-4 flex items-center cursor-pointer hover:bg-gray-700 space-x-2"
              onClick={() => setLanguage(lang)}
            >
              <img src={flag} alt={`${code} Flag`} className="w-6 h-auto" />
              <span className="text-lg">{code}</span>
            </li>
          ))}
      </ul>
    );
  };

  // Structure du rendu principal comprenant le menu principal, le sélecteur de langues, et le menu mobile
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-5 py-3 text-white z-50">
      {/* Sélecteur de langues */}
      <div className="relative">
        <div
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src={`/svg/flag_${selectedLanguage}.svg`}
            alt={`Flag ${selectedLanguage}`}
            className="w-6 h-auto"
          />
          <span className="font-bold text-lg">
            {selectedLanguage.toUpperCase()}
          </span>
        </div>
        {renderLanguageList()}
      </div>

      {/* Menu principal pour les écrans plus grands */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a
            href="#about"
            data-key="nav.about"
            onClick={(e) => handleScroll(e, "#about")}
            className="font-bold hover:underline"
          >
            À propos
          </a>
        </li>
        <li>
          <a
            href="#projects"
            data-key="nav.projects"
            onClick={(e) => handleScroll(e, "#projects")}
            className="font-bold hover:underline"
          >
            Projets
          </a>
        </li>
        <li>
          <a
            href="#skills"
            data-key="nav.skills"
            onClick={(e) => handleScroll(e, "#skills")}
            className="font-bold hover:underline"
          >
            Compétences
          </a>
        </li>
        <li>
          <a
            href="#education"
            data-key="nav.education"
            onClick={(e) => handleScroll(e, "#education")}
            className="font-bold hover:underline"
          >
            Éducation
          </a>
        </li>
        <li>
          <a
            href="#contact"
            data-key="nav.contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="font-bold hover:underline"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Bouton Hamburger pour les écrans mobiles */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="relative group z-50 md:hidden"
        aria-label="Menu"
      >
        {/* Animation du bouton */}
        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            {/* Lignes du bouton */}
            <div
              className={`w-7 bg-white transform transition-all duration-300 origin-left ${
                menuOpen ? "translate-x-10" : ""
              }`}
              style={{ height: "2px" }}
            ></div>
            <div
              className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75 ${
                menuOpen ? "translate-x-10" : ""
              }`}
            ></div>
            <div
              className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 ${
                menuOpen ? "translate-x-10" : ""
              }`}
            ></div>

            {/* Croix pour fermer le menu */}
            <div
              className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
                menuOpen ? "translate-x-0" : "-translate-x-10"
              } flex w-0 ${menuOpen ? "w-12" : ""}`}
            >
              <div
                className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${
                  menuOpen ? "rotate-45" : "rotate-0"
                }`}
              ></div>
              <div
                className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${
                  menuOpen ? "-rotate-45" : "-rotate-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </button>

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 h-screen bg-black text-white flex flex-col items-center justify-center w-[70vw] transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="space-y-6 text-lg">
          <li>
            <a
              href="#about"
              data-key="nav.about"
              onClick={(e) => handleScroll(e, "#about")}
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="#projects"
              data-key="nav.projects"
              onClick={(e) => handleScroll(e, "#projects")}
            >
              Projets
            </a>
          </li>
          <li>
            <a
              href="#skills"
              data-key="nav.skills"
              onClick={(e) => handleScroll(e, "#skills")}
            >
              Compétences
            </a>
          </li>
          <li>
            <a
              href="#education"
              data-key="nav.education"
              onClick={(e) => handleScroll(e, "#education")}
            >
              Éducation
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-key="nav.contact"
              onClick={(e) => handleScroll(e, "#contact")}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
