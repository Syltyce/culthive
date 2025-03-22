const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Définition du modèle User (utilisateur : id, pseudo, email, mdp, telephone, date de création et de changement)
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: "user"  // Par défaut, un utilisateur n'est pas admin
    },
    banned: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    }
    
  },
  {
    tableName: "users", // Nom de la table dans la base de données
    timestamps: true, // createdAt et updatedAt
  }
);

module.exports = User;
