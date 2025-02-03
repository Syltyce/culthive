// Ce fichier est utilisé pour configurer la connexion 
// à la base de données MySQL en utilisant l'ORM Sequelize. 
// Il établit la connexion à la base de données, 
// vérifie que la connexion est réussie et exporte l'instance sequelize 
// pour qu'elle puisse être utilisée dans d'autres parties du projet.

const { Sequelize } = require("sequelize"); // Sequelize est utilisé pour interagir avec la BDD

// Configuration variables d'environnement 
const dotenv = require("dotenv");
dotenv.config();

// Création d'une instance Sequelize pour se connecter à la BDD
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 3306,
    dialect: "mysql", 
  }
);

// Fonction pour tester la connexion à la base de données
async function testConnection() {
  try {
    await sequelize.authenticate(); // Tentative d'authentification avec la base de données
    console.log("✅ Connexion à la base de données réussie.");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error);
  }
}

testConnection(); // Appel de la fonction pour tester la connexion

// Exporte l'instance Sequelize pour être utilisée dans d'autres fichiers
module.exports = sequelize;
