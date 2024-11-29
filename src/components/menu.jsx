import React, { useState, useEffect } from "react";

const Menu = ({ changeLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

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

  const getNestedTranslation = (translations, lang, key) => {
    return key
      .split(".")
      .reduce(
        (obj, keyPart) => (obj ? obj[keyPart] : null),
        translations[lang]
      );
  };

  const setLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setSelectedLanguage(lang);
    console.log("Langue changée dans Menu.jsx :", lang);
    applyTranslations(lang, translations);
    setLanguageMenuOpen(false);
    changeLanguage(lang); // Appelle la fonction transmise depuis le parent
  };

  useEffect(() => {
    if (translations && selectedLanguage) {
      applyTranslations(selectedLanguage, translations);
    }
  }, [translations, selectedLanguage]);

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const renderLanguageList = () => {
    const languages = {
      fr: { code: "FR", flag: "/svg/flag_fr.svg" },
      en: { code: "EN", flag: "/svg/flag_en.svg" },
      es: { code: "ES", flag: "/svg/flag_es.svg" },
    };

    return (
      <ul>
        {Object.entries(languages)
          .filter(([lang]) => lang !== selectedLanguage)
          .map(([lang, { code, flag }]) => (
            <li key={lang} onClick={() => setLanguage(lang)}>
              <img src={flag} alt={`${code} Flag`} className="w-6 h-4 mr-2" />
              {code}
            </li>
          ))}
      </ul>
    );
  };

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="w-full flex items-center justify-between">
      <div
        className="absolute left-0 top-5 flex items-center z-50"
        style={{ marginLeft: "20px" }}
      >
        <div onClick={toggleLanguageMenu} id="selectedLanguage">
          <img
            src={`/svg/flag_${selectedLanguage}.svg`}
            alt="Drapeau actuel"
            style={{ cursor: "pointer" }}
          />
          <span>{selectedLanguage.toUpperCase()}</span>
        </div>
        <ul id="languageList" className={languageMenuOpen ? "visible" : ""}>
          {renderLanguageList()}
        </ul>
      </div>

      <div
        className={`fixed top-0 right-0 h-screen bg-[rgba(0,0,0,0.9)] text-white flex flex-col items-center justify-center w-[60vw] transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="space-y-6 text-lg">
          <li>
            <a href="#about" onClick={(e) => handleScroll(e, "#about")}>
              À propos
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleScroll(e, "#projects")}>
              Projets
            </a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => handleScroll(e, "#skills")}>
              Compétences
            </a>
          </li>
          <li>
            <a href="#education" onClick={(e) => handleScroll(e, "#education")}>
              Éducation
            </a>
          </li>
          <li>
            <a href="#cv" onClick={(e) => handleScroll(e, "#cv")}>
              CV
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
              Contact
            </a>
          </li>
        </ul>
      </div>

      <button
        className="absolute right-5 top-5 md:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu de navigation"
      >
        <div
          className={`w-6 h-1 bg-white mb-1 transition-transform ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <div
          className={`w-6 h-1 bg-white mb-1 ${menuOpen ? "hidden" : "block"}`}
        />
        <div
          className={`w-6 h-1 bg-white ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <ul className="absolute right-0 top-5 flex items-center z-50">
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
            href="#cv"
            data-key="nav.resume"
            onClick={(e) => handleScroll(e, "#cv")}
          >
            CV
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
    </nav>
  );
};

export default Menu;
