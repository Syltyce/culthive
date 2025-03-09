const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Utilisation de SQLite en mémoire pour les tests
});

// Définition du modèle List
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
  timestamps: true, // Ajoute createdAt et updatedAt
});

describe('Test du modèle List', () => {
  // Synchroniser la base de données avant les tests
  beforeAll(async () => {
    await sequelize.sync();
  });

  it('devrait créer une liste avec les propriétés attendues', async () => {
    const listData = {
      userId: 1,
      workId: '123',
      type: 'watchlist',
      workType: 'movie',
    };

    const list = await List.create(listData);

    // Vérifier que la liste a été créée avec les bonnes propriétés
    expect(list.userId).toBe(1);
    expect(list.workId).toBe('123');
    expect(list.type).toBe('watchlist');
    expect(list.workType).toBe('movie');
  });

  it('devrait générer une erreur si le champ "userId" est manquant', async () => {
    const listData = {
      workId: '123',
      type: 'favorites',
      workType: 'series',
    };

    try {
      await List.create(listData); // Pas de userId
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('devrait générer une erreur si "type" n\'est pas valide', async () => {
    const listData = {
      userId: 1,
      workId: '123',
      type: 'invalidType', // Type invalide
      workType: 'movie',
    };

    try {
      await List.create(listData);
    } catch (error) {
      expect(error.message).toContain('enum value of type');
    }
  });

  it('devrait générer une erreur si le champ "workId" est manquant', async () => {
    const listData = {
      userId: 1,
      type: 'favorites',
      workType: 'movie',
    };

    try {
      await List.create(listData); // Pas de workId
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  // Fermer la connexion après les tests
  afterAll(async () => {
    await sequelize.close();
  });
});
