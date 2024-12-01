# Portfolio - Enzo Turpin

## Description

Ceci est mon portfolio personnel construit avec **React** et **TailwindCSS**. Il présente divers projets, compétences techniques, parcours académique et inclut un formulaire de contact pour des collaborations potentielles ou des opportunités professionnelles.

## Fonctionnalités

- **Support multilingue** : Le portfolio prend en charge plusieurs langues avec un sélecteur de langue dynamique.
- **Navigation dynamique** : Navigation fluide avec un menu réactif pour les ordinateurs et les appareils mobiles.
- **Présentation de projets** : Une section mettant en avant les projets clés, avec des descriptions, les technologies utilisées et des liens vers des démos.
- **Compétences et Éducation** : Représentation visuelle des compétences techniques et un aperçu des diplômes obtenus.
- **Formulaire de contact** : Un formulaire fonctionnel avec un système de notifications en temps réel pour l'envoi de messages.
- **Bouton retour en haut** : Un bouton dynamique pour remonter en haut de la page.
- **CV téléchargeable** : Les visiteurs peuvent prévisualiser et télécharger le CV directement.

---

## Installation et configuration

### Prérequis

- Node.js (v14 ou version ultérieure)
- npm ou yarn

### Étapes

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/EnzoTurpin/portfolio-react.git
   cd portfolio_mail
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :

   Créez un fichier `.env` à la racine du dossier `portfolio_mail` et ajoutez les configurations nécessaires.

4. Lancez le serveur de développement :

   ```bash
   npm run dev
   ```

   Le portfolio sera disponible à l'adresse `http://localhost:5173`.

5. (Optionnel) Construisez pour la production :

   ```bash
   npm run build
   ```

6. **Configurez le serveur d'envoi de mails** :

   Ouvrez un **nouveau terminal**, placez-vous dans le dossier `portfolio_mail`, et lancez le serveur d'e-mails :

   ```bash
   node server.js
   ```

   Cela permettra au formulaire de contact d'envoyer des messages en utilisant la logique serveur définie dans `server.js`.

---

## Composants clés

### `Home.jsx`

La page principale du portfolio, contenant les sections À propos, Projets, Compétences, Éducation et Contact.

### `Menu.jsx`

Barre de navigation réactive avec sélection de la langue et défilement fluide.

### `Notifications.jsx`

Système de notifications Toast pour les retours utilisateur (par exemple, soumission de formulaire).

### `ScrollToTopButton.jsx`

Bouton flottant pour revenir en haut de la page.

### `server.js`

Gère la fonctionnalité d'envoi d'e-mails pour le formulaire de contact.

---

## Technologies utilisées

- **Frontend** : React, TailwindCSS
- **Backend** : Node.js (pour la gestion des e-mails)
- **Icônes** : SVG personnalisés pour les compétences et les liens (GitHub, LinkedIn)
- **Styling** : TailwindCSS avec des thèmes et classes utilitaires personnalisées
- **Localisation** : Support multilingue basé sur des fichiers JSON.

---

## Comment contribuer

1. Forkez le dépôt.
2. Créez une nouvelle branche pour votre fonctionnalité/correction de bug.
3. Commitez vos modifications avec des messages clairs.
4. Soumettez une pull request.

---

## Auteur

**Enzo Turpin**

- GitHub : [EnzoTurpin](https://github.com/EnzoTurpin)
- LinkedIn : [Enzo Turpin](https://www.linkedin.com/in/enzo-turpin/)

N'hésitez pas à explorer et à donner votre avis !
