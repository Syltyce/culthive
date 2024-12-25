// models/Review.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Importation des modèles User et Work
const User = require("./User");
const Work = require("./Work");

// Définition du modèle Review (critique)
class Review extends Model {}

// Initialisation du modèle Review (Note, Titre et Commentaire)
Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Review",
  }
);

// Relation entre Review, User et Work
Review.belongsTo(User); // Chaque critique appartient à un utilisateur
Review.belongsTo(Work); // Chaque critique est liée à une œuvre

module.exports = Review;
