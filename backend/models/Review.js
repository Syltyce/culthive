const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Importation des modèles User et Work
const User = require("./User");

// Définition du modèle Review (critique)
class Review extends Model {}

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
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      },
      onDelete: "CASCADE"
    },
    workId: { 
      type: DataTypes.STRING, 
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Review",
  }
);

Review.belongsTo( User, { foreignKey: "userId" } ); 

module.exports = Review;
