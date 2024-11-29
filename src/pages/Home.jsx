import { Helmet } from "react-helmet";
import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/menu";
import Notifications from "../components/Notifications";
import ScrollToTopButton from "../components/scroll-btn";
import "../styles/tailwind.css";

// Importation des logos des technologies et autres images
import icon from "/icon.png";
import quizImage from "/projects/quiz.png";
import forumImage from "/projects/forum.png";
import groupieImage from "/projects/groupie-tracker.png";
import cvPreview from "/CV-Enzo-Turpin.png";

// Importation des logos pour les compétences
import reactLogo from "/technologies/react.png";
import tailwindLogo from "/technologies/tailwind.png";
import phpLogo from "/technologies/php.png";
import golangLogo from "/technologies/golang.png";
import javaLogo from "/technologies/java.png";
import mysqlLogo from "/technologies/mysql.png";

// Importation des SVG pour les projets
import htmlSVG from "/svg/html.svg";
import cssSVG from "/svg/css.svg";
import javascriptSVG from "/svg/javascript.svg";
import golangSVG from "/svg/golang.svg";
import mysqlSVG from "/svg/mysql.svg";
import githubSVG from "/svg/github.svg";
import linkedinSVG from "/svg/linkedin.svg";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "fr"
  );
  const [notificationMessages, setNotificationMessages] = useState(null);
  const toastRef = useRef(null);

  // Charger les traductions pour les notifications
  useEffect(() => {
    fetch("/translations/translations.json")
      .then((res) => {
        console.log("Réponse brute :", res);
        if (!res.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Données JSON chargées :", data);
        if (data[selectedLanguage]?.contact?.notifications) {
          setNotificationMessages(data[selectedLanguage].contact.notifications);
        } else {
          console.error(
            `Pas de notifications disponibles pour la langue : ${selectedLanguage}`
          );
          setNotificationMessages(null);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des traductions :", err);
      });
  }, [selectedLanguage]);

  // Gestion du changement de langue
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Messages de notification :", notificationMessages);

    if (
      !notificationMessages ||
      Object.keys(notificationMessages).length === 0
    ) {
      console.error("Messages de notification introuvables ou incomplets !");
      return;
    }

    toastRef.current.show({
      title: notificationMessages.waiting.title,
      content: notificationMessages.waiting.content,
      cssClass: "e-toast-warning",
      icon: "e-warning toast-icons",
    });

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toastRef.current.show({
          title: notificationMessages.success.title,
          content: notificationMessages.success.content,
          cssClass: "e-toast-success",
          icon: "e-success toast-icons",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      toastRef.current.show({
        title: notificationMessages.error.title,
        content: notificationMessages.error.content,
        cssClass: "e-toast-danger",
        icon: "e-error toast-icons",
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Portfolio de Enzo Turpin - Développeur Web Full Stack Junior
        </title>
        <meta
          name="description"
          content="Portfolio de Enzo Turpin, développeur web full stack junior. Découvrez mes projets, compétences et expériences."
        />
        <link rel="icon" type="image/svg+xml" src={icon} />

        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Helmet>
      {/* En-tête */}
      <header className="parallax-header">
        <Menu changeLanguage={handleLanguageChange} />

        <div className="header-content">
          <div className="header-info">
            <img
              src={icon}
              alt="Logo de Enzo Turpin, développeur web"
              className="profile-img"
            />
            <div className="text-info">
              <h1 className="translate" data-key="header.name">
                Enzo Turpin
              </h1>
              <h2 className="translate" data-key="header.role">
                Développeur web <br />
                Full Stack Junior
              </h2>
              <p className="translate" data-key="header.description1">
                Étudiant en 2ème année de Bachelor Informatique
              </p>
              <p className="translate" data-key="header.description2">
                À la recherche d'un stage dans le développement web
              </p>
            </div>
          </div>
        </div>
      </header>
      {/* Section À propos */}
      <section id="about about-me">
        <h2 className="translate" data-key="about.title">
          À propos de moi
        </h2>
        <p className="translate" data-key="about.content">
          Étudiant en 2e année d'informatique à Ynov Campus, spécialisé en
          développement web <strong>(React, PHP, Golang, Python)</strong> et
          bases de données <strong>MySQL</strong>. Je recherche un stage pour
          mettre en pratique mes compétences. Curieux et motivé, je suis prêt à
          m'investir pleinement dans une équipe dynamique.
        </p>
      </section>
      {/* Section Projets */}
      <section id="projects my-projects" className="parallax-section">
        <h2 className="translate" data-key="projects.title">
          Projets
        </h2>
        <div className="projects-grid">
          {/* Projet 1 */}
          <div className="project">
            <img
              src={quizImage}
              alt="Capture d'écran du projet EasterQuiz, quiz sur les traditions de Pâques"
            />
            <div className="project-info">
              <h3 className="project-title translate">EasterQuiz</h3>
              <div className="technologies-used">
                {/* SVG HTML */}
                <div className="svg-container">
                  <img src={htmlSVG} alt="Logo HTML" />
                  <div className="tooltip">HTML</div>
                </div>
                {/* SVG CSS */}
                <div className="svg-container">
                  <img src={cssSVG} alt="Logo CSS" />
                  <div className="tooltip">CSS</div>
                </div>
                {/* SVG JavaScript */}
                <div className="svg-container">
                  <img src={javascriptSVG} alt="Logo JavaScript" />
                  <div className="tooltip">JavaScript</div>
                </div>
                {/* SVG Golang */}
                <div className="svg-container">
                  <img src={golangSVG} alt="Logo Golang" />
                  <div className="tooltip">Golang</div>
                </div>
              </div>
              <p
                className="project-description translate"
                data-key="projects.project1.description"
              >
                Quiz amusant sur les traditions de Pâques à travers le monde.
              </p>
              <div className="project-buttons">
                <a
                  href="https://github.com/EnzoTurpin/EasterQuiz"
                  className="github-button translate"
                  data-key="projects.buttons.github"
                  target="_blank"
                >
                  Voir sur GitHub
                </a>
                <a
                  href="https://easterquiz.enzo-turpin.fr"
                  className="view-button translate"
                  data-key="projects.buttons.view"
                  target="_blank"
                >
                  Voir le Projet
                </a>
              </div>
            </div>
          </div>
          {/* Projet 2 */}
          <div className="project">
            <img
              src={forumImage}
              alt="Capture d'écran du projet Forum, plateforme de discussion pour les passionnés de jeux vidéo"
            />
            <div className="project-info">
              <h3 className="project-title translate">Forum</h3>
              <div className="technologies-used">
                {/* SVG HTML */}
                <div className="svg-container">
                  <img src={htmlSVG} alt="Logo HTML" />
                  <div className="tooltip">HTML</div>
                </div>
                {/* SVG CSS */}
                <div className="svg-container">
                  <img src={cssSVG} alt="Logo CSS" />
                  <div className="tooltip">CSS</div>
                </div>
                {/* SVG JavaScript */}
                <div className="svg-container">
                  <img src={javascriptSVG} alt="Logo JavaScript" />
                  <div className="tooltip">JavaScript</div>
                </div>
                {/* SVG Golang */}
                <div className="svg-container">
                  <img src={golangSVG} alt="Logo Golang" />
                  <div className="tooltip">Golang</div>
                </div>
                {/* SVG MySQL */}
                <div className="svg-container">
                  <img src={mysqlSVG} alt="Logo MySQL" />
                  <div className="tooltip">MySQL</div>
                </div>
              </div>
              <p
                className="project-description translate"
                data-key="projects.project2.description"
              >
                Une plateforme de discussion pour les passionnés de jeux vidéo.
              </p>
              <div className="project-buttons">
                <a
                  href="https://github.com/EnzoTurpin/Forum"
                  className="github-button translate"
                  data-key="projects.buttons.github"
                  target="_blank"
                >
                  Voir sur GitHub
                </a>
                <a
                  href="https://forum.enzo-turpin.fr"
                  className="view-button translate"
                  data-key="projects.buttons.view"
                  target="_blank"
                >
                  Voir le Projet
                </a>
              </div>
            </div>
          </div>
          {/* Projet 3 */}
          <div className="project">
            <img
              src={groupieImage}
              alt="Capture d'écran du projet GroupieTracker, suivi des tournées d'artistes"
            />
            <div className="project-info">
              <h3 className="project-title translate">GroupieTracker</h3>
              <div className="technologies-used">
                {/* SVG HTML */}
                <div className="svg-container">
                  <img src={htmlSVG} alt="Logo HTML" />
                  <div className="tooltip">HTML</div>
                </div>
                {/* SVG CSS */}
                <div className="svg-container">
                  <img src={cssSVG} alt="Logo CSS" />
                  <div className="tooltip">CSS</div>
                </div>
                {/* SVG JavaScript */}
                <div className="svg-container">
                  <img src={javascriptSVG} alt="Logo JavaScript" />
                  <div className="tooltip">JavaScript</div>
                </div>
                {/* SVG Golang */}
                <div className="svg-container">
                  <img src={golangSVG} alt="Logo Golang" />
                  <div className="tooltip">Golang</div>
                </div>
              </div>
              <p
                className="project-description translate"
                data-key="projects.project3.description"
              >
                Une application pour suivre les tournées de vos artistes
                préférés.
              </p>
              <div className="project-buttons">
                <a
                  href="https://github.com/EnzoTurpin/GROUPIE-TRACKER"
                  className="github-button translate"
                  data-key="projects.buttons.github"
                  target="_blank"
                >
                  Voir sur GitHub
                </a>
                <a
                  href="https://groupietracker.enzo-turpin.fr/"
                  className="view-button translate"
                  data-key="projects.buttons.view"
                  target="_blank"
                >
                  Voir le Projet
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Compétences */}
      <section id="skills">
        <div className="skill-category">
          <h3 className="translate" data-key="skills.frameworks">
            Frameworks
          </h3>
          <div className="skills-grid">
            <div className="skill">
              <img
                src={reactLogo}
                alt="Logo React, compétence en développement d'interfaces utilisateur interactives"
              />
              <h4 className="translate" data-key="skills.react.name">
                React
              </h4>
              <p className="translate" data-key="skills.react.description">
                Création d'interfaces utilisateur dynamiques et modulaires avec
                React.
              </p>
            </div>
            <div className="skill">
              <img
                src={tailwindLogo}
                alt="Logo Tailwind CSS, compétence en création de styles CSS utilitaires"
              />
              <h4 className="translate" data-key="skills.tailwind.name">
                TailwindCSS
              </h4>
              <p className="translate" data-key="skills.tailwind.description">
                Conception rapide et flexible d'interfaces avec des classes
                utilitaires Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
        {/* Compétences Back-end */}
        <div className="skill-category">
          <h3 className="translate" data-key="skills.backend">
            Back-end
          </h3>
          <div className="skills-grid">
            <div className="skill">
              <img
                src={phpLogo}
                alt="Logo PHP, compétence en développement d'applications web dynamiques"
              />
              <h4 className="translate" data-key="skills.php.name">
                PHP
              </h4>
              <p className="translate" data-key="skills.php.description">
                Développement d'applications web dynamiques avec PHP.
              </p>
            </div>
            <div className="skill">
              <img
                src={golangLogo}
                alt="Logo Golang, compétence en développement de services backend performants"
              />
              <h4 className="translate" data-key="skills.golang.name">
                Golang
              </h4>
              <p className="translate" data-key="skills.golang.description">
                Conception de services backend performants avec Golang.
              </p>
            </div>
            <div className="skill">
              <img
                src="../../technologies/python.png"
                alt="Logo Python, compétence en automatisation et développement backend"
              />
              <h4 className="translate" data-key="skills.python.name">
                Python
              </h4>
              <p className="translate" data-key="skills.python.description">
                Automatisation, data science et back-end avec Python.
              </p>
            </div>
            <div className="skill">
              <img
                src={javaLogo}
                alt="Logo Java, compétence en développement d'applications et systèmes distribués"
              />
              <h4 className="translate" data-key="skills.java.name">
                Java
              </h4>
              <p className="translate" data-key="skills.java.description">
                Développement d'applications, systèmes distribués et back-end
                avec Java.
              </p>
            </div>
          </div>
          {/* Compétences Bases de données */}
          <div className="skill-category">
            <h3 className="translate" data-key="skills.databases">
              Bases de données
            </h3>
            <div className="skills-grid">
              <div className="skill">
                <img
                  src={mysqlLogo}
                  alt="Logo MySQL, compétence en gestion de bases de données relationnelles"
                />
                <h4 className="translate" data-key="skills.mysql.name">
                  MySQL
                </h4>
                <p className="translate" data-key="skills.mysql.description">
                  Gestion de bases de données relationnelles avec MySQL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Éducation */}
      <section id="education" className="parallax-section">
        <h2 className="translate" data-key="education.title">
          Éducation
        </h2>
        {/* Nouveau conteneur pour la grille */}
        <div className="education-container">
          <div className="education-item">
            <h3 className="translate" data-key="education.ynov.school">
              Ynov Campus
            </h3>
            <p
              className="education-degree translate"
              data-key="education.ynov.degree"
            >
              Bachelor - Informatique
            </p>
            <p
              className="education-dates translate"
              data-key="education.ynov.dates"
            >
              2023 - 2027
            </p>
          </div>
          <div className="education-item">
            <h3 className="translate" data-key="education.mediaschool.school">
              MediaSchool - SupDeWeb
            </h3>
            <p
              className="education-degree translate"
              data-key="education.mediaschool.degree"
            >
              Bachelor - Développement Web
            </p>
            <p
              className="education-dates translate"
              data-key="education.mediaschool.dates"
            >
              2022 - 2023
            </p>
          </div>
          <div className="education-item">
            <h3 className="translate" data-key="education.epitech.school">
              Epitech
            </h3>
            <p
              className="education-degree translate"
              data-key="education.epitech.degree"
            >
              Expert en Technologies Informatiques
            </p>

            <p
              className="education-dates translate"
              data-key="education.epitech.dates"
            >
              2022 - 2022
            </p>
          </div>
          <div className="education-item">
            <h3 className="translate" data-key="education.lycee.school">
              Lycée Louis Guilloux
            </h3>
            <p
              className="education-degree translate"
              data-key="education.lycee.degree"
            >
              Baccalauréat Professionnel Commerce
              <br />
            </p>
            <p
              className="education-dates translate"
              data-key="education.lycee.dates"
            >
              2019 - 2022
            </p>
          </div>
        </div>
      </section>
      {/* Notifications */}
      <Notifications ref={toastRef} />

      {/* Section Contact */}
      <section
        id="contact"
        className="flex flex-col items-center py-[60px] px-5"
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-10 w-full max-w-[1200px] gap-12 mx-auto">
          {/* CV Section */}
          <div
            id="cv"
            className="flex flex-col items-center md:items-center justify-center min-h-[500px] w-full md:w-1/2"
          >
            <h2
              className="text-2xl font-bold mb-5 text-center translate"
              data-key="resume.resume"
            >
              Mon CV
            </h2>
            <img
              src={cvPreview}
              alt="Aperçu de mon CV"
              className="w-[350px] h-auto border mb-[15px] rounded-[5px] border-solid border-[#ddd]"
            />
            <a
              href="/CV-Enzo-Turpin.pdf"
              download="CV-Enzo-Turpin.pdf"
              className="inline-block bg-[color:var(--color-dark)] text-white no-underline font-bold px-5 py-2.5 rounded-[5px] hover:bg-[color:var(--color-primary)] mt-4 translate"
              data-key="resume.download"
            >
              Télécharger mon CV
            </a>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <h2
              id="contact-me"
              className="text-3xl font-bold mb-10 translate"
              data-key="contact.title"
            >
              Contactez-moi
            </h2>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <label
                htmlFor="name"
                className="translate"
                data-key="contact.form.name"
              >
                <strong>Nom Prénom:</strong>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Nom et Prénom (facultatif)"
                className="translate"
                data-key="contact.form.namePlaceholder"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="email"
                className="translate"
                data-key="contact.form.email"
              >
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Entrez votre email"
                className="translate"
                data-key="contact.form.emailPlaceholder"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="message"
                className="translate"
                data-key="contact.form.message"
              >
                <strong>Message:</strong>
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Votre message"
                className="translate"
                data-key="contact.form.messagePlaceholder"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="translate"
                data-key="contact.form.submit"
              >
                Envoyer
              </button>
              <div className="flex items-center justify-center space-x-2 mt-6">
                <a
                  href="https://github.com/EnzoTurpin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={githubSVG}
                    alt="GitHub"
                    className="w-6 h-6 hover:opacity-75"
                  />
                </a>

                {/* Barre de séparation */}
                <div className="h-8 border-l-2 border-gray-300"></div>

                <a
                  href="https://www.linkedin.com/in/enzo-turpin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedinSVG}
                    alt="LinkedIn"
                    className="w-6 h-6 hover:opacity-75"
                  />
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
}

export default Home;
