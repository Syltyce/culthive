// models/Work.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // On importe la configuration de la base de données

class Work extends Model {}

// On définit la structure du modèle "Work"
Work.init(
  {
    external_id: {
      type: DataTypes.INTEGER, // Identifiant unique de l'œuvre provenant de l'API externe
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Une description détaillée de l'œuvre
    },
    image_url: {
      type: DataTypes.STRING, // L'URL de l'image de l'œuvre
    },
    type: {
      type: DataTypes.STRING, // Le type d'œuvre (film, livre, etc.)
    },
  },
  {
    sequelize,
    modelName: "Work", // Le nom du modèle
  }
);

module.exports = Work;
