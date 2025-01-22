const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que la config DB est correcte

const List = sequelize.define('List', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  workId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('watchlist', 'favorites'),
    allowNull: false,
  },
  workType: {
    type: DataTypes.STRING, // Afin de séparer les films des séries
    allowNull: false,
  },
}, {
  tableName: 'Lists',
  timestamps: true, // Ajoute `createdAt` et `updatedAt`
});

module.exports = List;
