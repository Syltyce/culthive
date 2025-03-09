const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Utilisation de SQLite en mémoire pour les tests
});

// Définition des modèles
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
}, {
  tableName: 'users',
  timestamps: true,
});

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
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
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  workId: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Review',
});

Review.belongsTo(User, { foreignKey: 'userId' });

describe('Test du modèle Review', () => {
  // Synchroniser la base de données avant les tests
  beforeAll(async () => {
    await sequelize.sync();
  });

  // Créer un utilisateur pour tester les critiques
  let user;
  beforeAll(async () => {
    user = await User.create({
      username: 'testUser',
      email: 'testuser@example.com',
      password: 'Password123!',
    });
  });

  it('devrait créer une critique avec les bonnes propriétés', async () => {
    const reviewData = {
      rating: 8,
      title: 'Great Movie',
      comment: 'I really enjoyed this movie. It was fantastic!',
      userId: user.id,
      workId: '123',
    };

    const review = await Review.create(reviewData);

    // Vérifier que la critique a été créée avec les bonnes propriétés
    expect(review.rating).toBe(8);
    expect(review.title).toBe('Great Movie');
    expect(review.comment).toBe('I really enjoyed this movie. It was fantastic!');
    expect(review.userId).toBe(user.id);
    expect(review.workId).toBe('123');
  });

  it('devrait générer une erreur si le champ "rating" est en dehors des limites', async () => {
    const reviewData = {
      rating: 11, // Rating invalide
      title: 'Bad Movie',
      comment: 'This movie was terrible.',
      userId: user.id,
      workId: '124',
    };

    try {
      await Review.create(reviewData);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Validation max on rating');
    }
  });

  it('devrait générer une erreur si le champ "comment" est manquant', async () => {
    const reviewData = {
      rating: 7,
      title: 'Okay Movie',
      userId: user.id,
      workId: '125',
    };

    try {
      await Review.create(reviewData); // Pas de commentaire
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('notNull Violation');
    }
  });

  // Fermer la connexion après les tests
  afterAll(async () => {
    await sequelize.close();
  });
});
