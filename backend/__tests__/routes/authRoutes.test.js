const request = require("supertest");
const express = require("express");

const app = express();
const router = require("../../routes"); // Importation du routeur central (routes/index.js)

app.use(express.json()); // Middleware pour parser le corps de la requête en JSON
app.use("/api", router); // Router principal pour tester toutes les routes

describe("POST /api/auth/register", () => {
  // Test pour une inscription réussie
  it("devrait dire que l'inscription a été réussie", async () => {
    const user = {
      username: "testuser",
      email: `testuser${Date.now()}@example.com`, // Email unique à chaque test
      password: "Password123",
    };

    const response = await request(app).post("/api/auth/register").send(user);

    console.log(response.body); // Affiche le corps de la réponse pour mieux comprendre l'erreur
    expect(response.status).toBe(201); // Vérifie que le statut est 201 (Créé)
    expect(response.body).toHaveProperty("message", "Inscription réussie");
  });

  // Test pour un email manquant
  it("devrait dire que tous les champs sont obligatoires", async () => {
    const user = {
      username: "testuser",
      // Pas d'email
      password: "Password123",
    };

    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.status).toBe(400); // Vérifie que le statut est 400
    expect(response.body).toHaveProperty("code", "FIELDS_MISSING");
    expect(response.body).toHaveProperty(
      "message",
      "Tous les champs obligatoires ne sont pas remplis."
    );
  });

  // Test pour un format d'email invalide
  it("devrait dire que l'email est invalide", async () => {
    const user = {
      username: "testuser",
      email: "invalid-email", // Email invalide
      password: "Password123",
    };

    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.status).toBe(400); // Vérifie que le statut est 400
    expect(response.body).toHaveProperty("code", "EMAIL_INVALID");
    expect(response.body).toHaveProperty("message", "L'email est invalide.");
  });

  // Test pour un mot de passe trop faible
  it("devrait dire que le mot de passe est trop faible", async () => {
    const user = {
      username: "testuser",
      email: `testuser${Date.now()}@example.com`, // Email unique
      password: "short", // Mot de passe trop court
    };

    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.status).toBe(400); // Vérifie que le statut est 400
    expect(response.body).toHaveProperty("code", "PASSWORD_WEAK");
    expect(response.body).toHaveProperty(
      "message",
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
    );
  });

  // Test pour un email déjà utilisé
  it("devrait dire que l'email est déjà utilisé", async () => {
    const user = {
      username: "testuser",
      email: "testuser@example.com", // Email déjà utilisé
      password: "Password123",
    };

    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.status).toBe(400); // Vérifie que le statut est 400
    expect(response.body).toHaveProperty("code", "EMAIL_ALREADY_USED");
    expect(response.body).toHaveProperty(
      "message",
      "Cet email est déjà utilisé."
    );
  });

});
