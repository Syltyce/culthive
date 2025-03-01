# CultHive - Plateforme de gestion d'œuvres (Films/Séries)

CultHive est une plateforme permettant aux utilisateurs de gérer leurs films et séries préférés. Les utilisateurs peuvent ajouter des œuvres à leurs listes personnelles (Watchlist, Favorites), laisser des avis, et gérer leurs films et séries à travers une interface conviviale. Le projet comprend un backend en Node.js, un frontend en Next.js, et une base de données MySQL pour stocker les données des utilisateurs et des œuvres.

## Technologies utilisées

- **Backend**: Node.js, Express
- **Frontend**: Next.js, React.js
- **Base de données**: MySQL
- **ORM**: Sequelize (pour interagir avec MySQL)
- **Authentification**: JWT (JSON Web Token)
- **Paiements**: Stripe (pour la gestion des paiements)
- **Déploiement**: Railway (pour le backend), Vercel (pour le frontend)
- **Autres**: CORS, dotenv, swagger-ui-express, bcryptjs

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- **Node.js** (Version 14.x ou supérieure)
- **NPM** (Gestionnaire de paquets JavaScript)
- **MySQL** (Base de données relationnelle)
- **Docker** (Optionnel, pour gérer l'environnement de développement avec Docker)

## Installation et configuration

Clonez le projet depuis GitHub avec la commande suivante :

```bash
    git clone https://github.com/Syltyce/culthive
``` 

Ensuite, accédez aux 2 répertoires :

```bash
    cd backend
``` 

```bash
    cd frontend
``` 

Installez les dépendances nécessaires dans les 2 répertoires :

```bash
    npm install
``` 

## Dans le dossier backend, créez un fichier .env avec les variables suivantes :

NODE_ENV=development

DB_NAME=nom_de_votre_base_de_donnees
DB_USER=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
DB_HOST=localhost
DB_PORT=port_de_votre_bdd_mysql
DB_DIALECT=mysql

JWT_SECRET=votre_jeton_jwt_secret

TMDB_API_KEY=la_cle_api_de_tmdb
TMDB_JWT=le_jwt_de_tmdb

STRIPE_SECRET_KEY=la_cle_secrete_api_de_stripe

FRONTEND_URL=url_de_votre_front

## Dans le dossier frontend, créez un fichier .env et ajoutez la variable suivante :

NEXT_PUBLIC_TMDB_API_KEY=cle_public_de_api_tmdb

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=cle_publique_de_api_stripe

NEXT_PUBLIC_API_URL=url_de_votre_back_api

## Ensuite vous pouver lancer les serveurs dans les 2 répertoire (front et back) :

```bash
    npm run dev
``` 