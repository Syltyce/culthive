const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", // Type de base de données
    logging: false, // Désactive les logs SQL dans la console
  }
);

// Vérifier la connexion
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie.");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error);
  }
}

testConnection();

module.exports = sequelize;
