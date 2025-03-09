const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

// Définition du modèle User
const User = sequelize.define("User", {
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
    defaultValue: "user",
  },
  banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "users",
  timestamps: true,
});

describe("Test du modèle User", () => {
  beforeAll(async () => {
    await sequelize.sync(); // Synchronise le modèle avec la base de données en mémoire
  });

  it("devrait utiliser 'user' comme rôle par défaut", async () => {
    const userData = {
      username: "default_role",
      email: "default_role@example.com",
      password: "Password123!",
    };

    const user = await User.create(userData);

    expect(user.role).toBe("user"); // Vérifie que le rôle par défaut est "user"
  });

  afterAll(async () => {
    await sequelize.close(); // Ferme la connexion à la base de données après les tests
  });
});
