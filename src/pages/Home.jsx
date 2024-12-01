import { Helmet } from "react-helmet";
import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/menu";
import Notifications from "../components/Notifications";
import ScrollToTopButton from "../components/scroll-btn";

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
import pythonLogo from "/technologies/python.png";
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
      <div
        className="font-sans leading-[1.6] box-border text-[color:var(--color-dark)] m-0 p-0"
        style={{ background: "linear-gradient(to bottom, #ffffff, #333)" }}
      >
        <header className="bg-[url('../../background.jpg')] bg-fixed bg-center bg-no-repeat bg-cover text-[color:var(--color-light)] relative flex flex-col justify-center items-center w-full h-auto min-h-screen overflow-hidden px-5">
          <Menu changeLanguage={handleLanguageChange} />

          <div className="flex flex-col md:flex-col lg:flex-row items-center text-center md:text-center lg:text-left max-w-[1000px] w-full mx-auto my-0">
            {/* Conteneur de la photo */}
            <div className="flex justify-center mb-5 lg:mb-0">
              <img
                src={icon}
                alt="Logo de Enzo Turpin, développeur web"
                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:mr-5 border-[color:var(--color-light)] bg-[color:var(--color-dark)] rounded-full border-[3px] border-solid object-cover"
              />
            </div>

            {/* Conteneur du texte */}
            <div className="flex flex-col items-center lg:items-start">
              <h1
                className="font-bold text-[1.8em] md:text-[2em] m-0"
                data-key="header.name"
              >
                Enzo Turpin
              </h1>
              <h2
                className="font-bold text-[2em] md:text-[3em] m-0 leading-tight"
                data-key="header.role"
              >
                Développeur web <br />
                Full Stack Junior
              </h2>
              <p
                className="text-[1em] md:text-[1.5em] text-[color:var(--color-gray)] mx-0 my-[5px]"
                data-key="header.description1"
              >
                Étudiant en 2ème année de Bachelor Informatique
              </p>
              <p
                className="text-[1em] md:text-[1.5em] text-[color:var(--color-gray)] mx-0 my-[5px]"
                data-key="header.description2"
              >
                À la recherche d'un stage dans le développement web
              </p>
            </div>
          </div>
        </header>

        {/* Section À propos */}

        <section
          id="about"
          className="flex flex-col items-center text-center px-5 py-[60px]"
        >
          <h2
            className="font-bold text-[2em] mb-10 border-b-2 border-solid"
            data-key="about.title"
          >
            À propos de moi
          </h2>
          <p className="max-w-[800px] leading-[1.8]" data-key="about.content">
            Étudiant en 2e année d'informatique à Ynov Campus, spécialisé en
            développement web (React, PHP, Golang, Python) et bases de données
            MySQL. Je recherche un stage pour mettre en pratique mes
            compétences. Curieux et motivé, je suis prêt à m'investir pleinement
            dans une équipe dynamique.
          </p>
        </section>

        {/* Section Projets */}
        <section
          id="projects"
          className="flex flex-col items-center text-center px-5 py-[60px]"
        >
          <h2
            className="font-bold text-[2em] mb-10 border-b-2 border-solid"
            data-key="projects.title"
          >
            Projets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full box-border mt-10 p-0">
            {/* Projet 1 */}
            <div className="relative overflow-hidden bg-[color:var(--color-light)] shadow-[0_4px_6px_var(--color-shadow)] transition-transform duration-[0.3s] ease-[ease] flex flex-col justify-between rounded-[10px] hover:-translate-y-2.5">
              <img
                className="w-full h-auto object-cover rounded-t-[10px]"
                src={quizImage}
                alt="Capture d'écran du projet EasterQuiz, quiz sur les traditions de Pâques"
              />
              <div className="text-left flex flex-col justify-between p-5">
                <h3 className="text-[1.5em] text-[color:var(--color-dark)] mt-0 mb-2.5 mx-0">
                  EasterQuiz
                </h3>
                <div className="flex gap-[5px] mt-[5px]">
                  <div className="relative inline-block">
                    <img
                      src={htmlSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo HTML"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={cssSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo CSS"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={javascriptSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo JavaScript"
                    />
                  </div>
                </div>
                <p
                  className="text-[1em] text-[color:var(--color-gray-dark)] mb-[15px]"
                  data-key="projects.project1.description"
                >
                  Quiz amusant sur les traditions de Pâques à travers le monde.
                </p>
                <div className="flex flex-wrap justify-start mt-2 space-x-2 sm:space-x-0 sm:space-y-2">
                  <a
                    href="https://github.com/EnzoTurpin/EasterQuiz"
                    className="inline-block bg-[color:var(--color-dark)] text-[color:var(--color-light)] no-underline text-[1em] transition-[background-color] duration-[0.3s] ease-[ease] mr-2.5 mt-auto px-5 py-2.5 rounded-[5px]"
                    data-key="projects.buttons.github"
                    target="_blank"
                  >
                    Voir sur GitHub
                  </a>
                  <a
                    href="https://easterquiz.enzo-turpin.fr"
                    className="inline-block bg-[color:var(--color-dark)] text-[color:var(--color-light)] no-underline text-[1em] transition-[background-color] duration-[0.3s] ease-[ease] mr-2.5 mt-auto px-5 py-2.5 rounded-[5px]"
                    data-key="projects.buttons.view"
                    target="_blank"
                  >
                    Voir le Projet
                  </a>
                </div>
              </div>
            </div>

            {/* Projet 2 */}
            <div className="relative overflow-hidden bg-[color:var(--color-light)] shadow-[0_4px_6px_var(--color-shadow)] transition-transform duration-[0.3s] ease-[ease] flex flex-col justify-between rounded-[10px] hover:-translate-y-2.5">
              <img
                className="w-full h-auto object-cover rounded-t-[10px]"
                src={forumImage}
                alt="Capture d'écran du projet Forum, plateforme de discussion pour les passionnés de jeux vidéo"
              />
              <div className="text-left flex flex-col justify-between p-5">
                <h3 className="text-[1.5em] text-[color:var(--color-dark)] mt-0 mb-2.5 mx-0">
                  Forum
                </h3>
                <div className="flex gap-[5px] mt-[5px]">
                  <div className="relative inline-block">
                    <img
                      src={htmlSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo HTML"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={cssSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo CSS"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={javascriptSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo JavaScript"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={mysqlSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo MySQL"
                    />
                  </div>
                </div>
                <p
                  className="text-[1em] text-[color:var(--color-gray-dark)] mb-[15px]"
                  data-key="projects.project2.description"
                >
                  Une plateforme de discussion pour les passionnés de jeux
                  vidéo.
                </p>
                <div className="flex flex-wrap justify-start mt-2 space-x-2 sm:space-x-0 sm:space-y-2">
                  <a
                    href="https://github.com/EnzoTurpin/EasterQuiz"
                    className="inline-block bg-[color:var(--color-dark)] text-[color:var(--color-light)] no-underline text-[1em] transition-[background-color] duration-[0.3s] ease-[ease] mr-2.5 mt-auto px-5 py-2.5 rounded-[5px]"
                    data-key="projects.buttons.github"
                    target="_blank"
                  >
                    Voir sur GitHub
                  </a>
                  <a
                    href="https://easterquiz.enzo-turpin.fr"
                    className="inline-block bg-[color:var(--color-dark)] text-[color:var(--color-light)] no-underline text-[1em] transition-[background-color] duration-[0.3s] ease-[ease] mr-2.5 mt-auto px-5 py-2.5 rounded-[5px]"
                    data-key="projects.buttons.view"
                    target="_blank"
                  >
                    Voir le Projet
                  </a>
                </div>
              </div>
            </div>

            {/* Projet 3 */}
            <div className="relative overflow-hidden bg-[color:var(--color-light)] shadow-[0_4px_6px_var(--color-shadow)] transition-transform duration-[0.3s] ease-[ease] flex flex-col justify-between rounded-[10px] hover:-translate-y-2.5">
              <img
                className="w-full h-auto object-cover rounded-t-[10px]"
                src={groupieImage}
                alt="Capture d'écran du projet GroupieTracker, suivi des tournées d'artistes"
              />
              <div className="text-left flex flex-col justify-between p-5">
                <h3 className="text-[1.5em] text-[color:var(--color-dark)] mt-0 mb-2.5 mx-0">
                  GroupieTracker
                </h3>
                <div className="flex gap-[5px] mt-[5px]">
                  <div className="relative inline-block">
                    <img
                      src={htmlSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo HTML"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={cssSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo CSS"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={javascriptSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo JavaScript"
                    />
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={golangSVG}
                      className="w-6 h-6 align-middle"
                      alt="Logo Golang"
                    />
                  </div>
                </div>
                <p
                  className="text-[1em] text-[color:var(--color-gray-dark)] mb-[15px]"
                  data-key="projects.project3.description"
                >
                  Une application pour suivre les tournées de vos artistes
                  préférés.
                </p>
                <div className="flex flex-wrap justify-start mt-2 space-x-2 sm:space-x-0 sm:space-y-2">
                  <a
                    href="https://github.com/EnzoTurpin/EasterQuiz"
                    className="inline-block bg-[color:var(--color-dark)] text-[color:var(--color-light)] no-underline text-[1em] transition-[background-color] duration-[0.3s] ease-[ease] mr-2.5 mt-auto px-5 py-2.5 rounded-[5px]"
                    data-key="projects.buttons.github"
                    target="_blank"
                  >
                    Voir sur GitHub
                  </a>
                  <a
                    href="https://easterquiz.enzo-turpin.fr"
                    className="inline-block bg-[color:var(--color-dark)] text-[color:var(--color-light)] no-underline text-[1em] transition-[background-color] duration-[0.3s] ease-[ease] mr-2.5 mt-auto px-5 py-2.5 rounded-[5px]"
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
        <section
          id="skills"
          className="flex flex-col items-center text-center px-5 py-[60px]"
        >
          <div>
            <h3
              className="font-bold text-[1.8em] border-b-[color:var(--color-gray)] mb-5 mt-10 pb-2.5 border-b-2 border-solid"
              data-key="skills.frameworks"
            >
              Frameworks
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={reactLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo React, compétence en développement d'interfaces utilisateur interactives"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.react.name"
                >
                  React
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)] "
                  data-key="skills.react.description"
                >
                  Création d'interfaces utilisateur dynamiques et modulaires
                  avec React.
                </p>
              </div>
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={tailwindLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo Tailwind CSS, compétence en création de styles CSS utilitaires"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.tailwind.name"
                >
                  TailwindCSS
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)]"
                  data-key="skills.tailwind.description"
                >
                  Conception rapide et flexible d'interfaces avec des classes
                  utilitaires Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
          {/* Compétences Back-end */}
          <div>
            <h3
              className="font-bold text-[1.8em] border-b-[color:var(--color-gray)] mb-5 mt-10 pb-2.5 border-b-2 border-solid"
              data-key="skills.backend"
            >
              Back-end
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={phpLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo PHP, compétence en développement d'applications web dynamiques"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.php.name"
                >
                  PHP
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)]"
                  data-key="skills.php.description"
                >
                  Développement d'applications web dynamiques avec PHP.
                </p>
              </div>
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={golangLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo Golang, compétence en développement de services backend performants"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.golang.name"
                >
                  Golang
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)]"
                  data-key="skills.golang.description"
                >
                  Conception de services backend performants avec Golang.
                </p>
              </div>
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={pythonLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo Python, compétence en automatisation et développement backend"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.python.name"
                >
                  Python
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)]"
                  data-key="skills.python.description"
                >
                  Automatisation, data science et back-end avec Python.
                </p>
              </div>
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={javaLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo Java, compétence en développement d'applications et systèmes distribués"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.java.name"
                >
                  Java
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)]"
                  data-key="skills.java.description"
                >
                  Développement d'applications, systèmes distribués et back-end
                  avec Java.
                </p>
              </div>
            </div>
          </div>
          {/* Compétences Bases de données */}
          <div>
            <h3
              className="font-bold text-[1.8em] border-b-[color:var(--color-gray)] mb-5 mt-10 pb-2.5 border-b-2 border-solid"
              data-key="skills.databases"
            >
              Bases de données
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
              <div className="flex flex-col items-center bg-[color:var(--color-background-gray)] shadow-[0_4px_8px_var(--color-shadow)] p-5 rounded-[10px] text-center">
                <img
                  src={mysqlLogo}
                  className="w-[60px] h-[60px] object-contain mb-4"
                  alt="Logo MySQL, compétence en gestion de bases de données relationnelles"
                />
                <h4
                  className="font-bold text-[1.2em] mb-2.5 leading-tight"
                  data-key="skills.mysql.name"
                >
                  MySQL
                </h4>
                <p
                  className="text-[0.9em] text-[color:var(--color-gray-dark)]"
                  data-key="skills.mysql.description"
                >
                  Gestion de bases de données relationnelles avec MySQL.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Section Éducation */}
        <section
          id="education"
          className="flex flex-col items-center text-center px-5 py-[60px]"
        >
          <h2
            className="font-bold text-[2.5em] border-b-2 border-solid  text-white mb-5"
            data-key="education.title"
          >
            Éducation
          </h2>
          {/* Nouveau conteneur pour la grille */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 max-w-[800px] w-full">
            <div className="flex flex-col justify-center items-start bg-[color:var(--color-light)] shadow-[0_4px_8px_var(--color-shadow)] h-[200px] p-5 rounded-[10px]">
              <h3
                className="font-bold text-[1.5em] text-[color:var(--color-dark)] mb-[5px]"
                data-key="education.ynov.school"
              >
                Ynov Campus
              </h3>
              <p
                className="font-bold text-[color:var(--color-gray-dark)] mb-2.5"
                data-key="education.ynov.degree"
              >
                Bachelor - Informatique
              </p>
              <p
                className="text-[0.9em] text-[color:var(--color-primary)]"
                data-key="education.ynov.dates"
              >
                2023 - 2027
              </p>
            </div>
            <div className="flex flex-col justify-center items-start bg-[color:var(--color-light)] shadow-[0_4px_8px_var(--color-shadow)] h-[200px] p-5 rounded-[10px]">
              <h3
                className="font-bold text-[1.5em] text-[color:var(--color-dark)] mb-[5px]"
                data-key="education.mediaschool.school"
              >
                MediaSchool - SupDeWeb
              </h3>
              <p
                className="font-bold text-[color:var(--color-gray-dark)] mb-2.5"
                data-key="education.mediaschool.degree"
              >
                Bachelor - Développement Web
              </p>
              <p
                className="text-[0.9em] text-[color:var(--color-primary)]"
                data-key="education.mediaschool.dates"
              >
                2022 - 2023
              </p>
            </div>
            <div className="flex flex-col justify-center items-start bg-[color:var(--color-light)] shadow-[0_4px_8px_var(--color-shadow)] h-[200px] p-5 rounded-[10px]">
              <h3
                className="font-bold text-[1.5em] text-[color:var(--color-dark)] mb-[5px]"
                data-key="education.epitech.school"
              >
                Epitech
              </h3>
              <p
                className="font-bold text-[color:var(--color-gray-dark)] mb-2.5"
                data-key="education.epitech.degree"
              >
                Expert en Technologies Informatiques
              </p>

              <p
                className="text-[0.9em] text-[color:var(--color-primary)]"
                data-key="education.epitech.dates"
              >
                2022 - 2022
              </p>
            </div>
            <div className="flex flex-col justify-center items-start bg-[color:var(--color-light)] shadow-[0_4px_8px_var(--color-shadow)] h-[200px] p-5 rounded-[10px]">
              <h3
                className="font-bold text-[1.5em] text-[color:var(--color-dark)] mb-[5px]"
                data-key="education.lycee.school"
              >
                Lycée Louis Guilloux
              </h3>
              <p
                className="font-bold text-[color:var(--color-gray-dark)] mb-2.5"
                data-key="education.lycee.degree"
              >
                Baccalauréat Professionnel Commerce
                <br />
              </p>
              <p
                className="text-[0.9em] text-[color:var(--color-primary)]"
                data-key="education.lycee.dates"
              >
                2019 - 2022
              </p>
            </div>
          </div>
        </section>
        {/* Section Contact */}
        <section
          id="contact"
          className="flex flex-col items-center text-center px-5 py-[60px]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-10 w-full max-w-[1200px] gap-12 mx-auto">
            {/* CV Section */}
            <div
              id="cv"
              className="flex flex-col items-center md:items-center justify-center min-h-[500px] w-full md:w-1/2"
            >
              <h2
                className="font-bold text-[2em] border-b-2 border-solid text-white mb-5"
                data-key="resume.resume"
              >
                Mon CV
              </h2>
              <img
                src={cvPreview}
                className="w-[300px] h-auto border mb-[15px] rounded-[5px] border-solid border-[#ddd]"
                alt="Aperçu de mon CV"
              />
              <a
                href="/CV-Enzo-Turpin.pdf"
                download="CV-Enzo-Turpin.pdf"
                className="inline-block bg-[color:var(--color-dark)] text-white no-underline font-bold px-5 py-2.5 rounded-[5px] hover:bg-[color:var(--color-primary)] mt-4 border-2 border-white"
                data-key="resume.download"
              >
                Télécharger mon CV
              </a>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <h2
                id="contact-me"
                className="font-bold text-[2em] border-b-2 border-solid text-white mb-5"
                data-key="contact.title"
              >
                Contactez-moi
              </h2>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="max-w-[500px] shadow-[0_0_10px_var(--color-shadow)] mx-auto my-0 p-5 rounded-[10px] bg-[color:var(--color-light)]"
              >
                <label
                  htmlFor="name"
                  className="block mt-2.5 mb-[5px] mx-0"
                  data-key="contact.form.name"
                >
                  <strong>Nom Prénom:</strong>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nom et Prénom (facultatif)"
                  className="w-full border border-[color:var(--color-gray)] resize-none p-2.5 rounded-[5px] border-solid"
                  data-key="contact.form.namePlaceholder"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="block mt-2.5 mb-[5px] mx-0"
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
                  className="w-full border border-[color:var(--color-gray)] resize-none p-2.5 rounded-[5px] border-solid"
                  data-key="contact.form.emailPlaceholder"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="message"
                  className="block mt-2.5 mb-[5px] mx-0"
                  data-key="contact.form.message"
                >
                  <strong>Message:</strong>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Votre message"
                  className="w-full border border-[color:var(--color-gray)] resize-none min-h-[150px] min-w-[250px] overflow-y-hidden mb-5 p-2.5 rounded-[5px] border-solid"
                  data-key="contact.form.messagePlaceholder"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[color:var(--color-dark)] text-[color:var(--color-light)] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[color:var(--color-primary)]"
                  data-key="contact.form.submit"
                >
                  Envoyer
                </button>
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <a
                    href="https://github.com/EnzoTurpin"
                    className="text-[color:var(--color-dark)] no-underline text-[1.2em] my-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={githubSVG}
                      alt="GitHub"
                      className="w-6 h-6 hover:opacity-75"
                    />
                  </a>
                  <div className="h-8 border-l-2 border-gray-300"></div>
                  <a
                    href="https://www.linkedin.com/in/enzo-turpin/"
                    className="text-[color:var(--color-dark)] no-underline text-[1.2em] my-0"
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
        {/* Notifications */}
        <Notifications ref={toastRef} />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default Home;
