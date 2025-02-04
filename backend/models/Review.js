// models/Review.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Importation des modèles User et Work
const User = require("./User");

// Définition du modèle Review (critique)
class Review extends Model {}

// Initialisation du modèle Review (Note, Titre et Commentaire)
Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: { // Définir explicitement la clé étrangère userId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      },
      onDelete: "CASCADE"
    },
    workId: { // Stocker l'ID de l'œuvre provenant de l'API externe
      type: DataTypes.STRING, // Utilise STRING ou INTEGER selon le type de l'ID externe
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Review",
  }
);

// Relation entre Review, User et Work
Review.belongsTo( User, { foreignKey: "userId" } ); // Chaque critique appartient à un utilisateur

module.exports = Review;
