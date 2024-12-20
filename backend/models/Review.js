// models/Review.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Work = require('./Work');

class Review extends Model {}

Review.init({
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'Review',
});

// Relation entre Review, User et Work
Review.belongsTo(User);  // Chaque critique appartient à un utilisateur
Review.belongsTo(Work);  // Chaque critique est liée à une œuvre

module.exports = Review;
