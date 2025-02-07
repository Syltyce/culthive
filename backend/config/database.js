const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });
}

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connexion réussie (${env}) !`);
  } catch (error) {
    console.error(`❌ Erreur de connexion (${env}) :`, error);
  }
}

testConnection();

module.exports = sequelize;
