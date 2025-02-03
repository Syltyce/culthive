// Importation des modèles nécessaires (List et User)
const List = require("../models/List");
const User = require("../models/User");

// Axios pour effectuer des requêtes HTTP, utilisé ici pour interagir avec une API externe
const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Charge la clé depuis l'environnement

// Fonction pour ajouter une œuvre à une liste
exports.addToList = async (req, res) => {
  try {
    // Extraction des données envoyées dans le corps de la requête
    const { userId, workId, type, workType } = req.body;

    // Validation basique des champs nécessaires
    if (!userId || !workId || !type || !workType) {
      return res.status(400).json({
        message:
          "Les champs userId, workId, type et workType sont obligatoires.",
      });
    }

    // Vérifie si l'utilisateur existe
    const user = await User.findByPk(userId); // Recherche d'un user de la table `User` grâce à l'ID
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifie si l'œuvre existe déjà dans la liste
    const existingEntry = await List.findOne({
      where: { userId, workId, type, workType },
    });
    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "Cette œuvre est déjà dans la liste." });
    }

    // Ajout de l'œuvre à la liste s'il n'est pas dans la liste
    const newEntry = await List.create({ userId, workId, type, workType });
    return res.status(201).json({
      message: `${workType === "film" ? "Le film" : "La série"} a été ajouté
      à la liste " ${type} " de l'utilisateur ${userId}.`,
      data: newEntry,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la liste :", error);
    return res.status(500).json({
      message: "Erreur lors de l'ajout à la liste.",
      error: error.message,
    });
  }
};

// Fonction pour supprimer une œuvre d'une liste
exports.removeFromList = async (req, res) => {
  try {
    // Extraction des données envoyées dans le corps de la requête
    const { userId, workId, type } = req.body;

    // Suppression de l'œuvre de la liste de l'utilisateur
    const deleted = await List.destroy({ where: { userId, workId, type } });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Aucune œuvre trouvée dans la liste." });
    }

    // Si la suppression a réussi
    res.status(200).json({ message: "Œuvre supprimée de la liste." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression.", error });
  }
};

// Fonction pour récupérer une liste spécifique d'un utilisateur
exports.getList = async (req, res) => {
  try {
    // Extraction des paramètres de la requête
    const { userId, type } = req.query;

    // Récupération de toutes les œuvres d'un utilisateur pour un type de liste spécifique (watchlist, favorites)
    const list = await List.findAll({ where: { userId, type } });
    res.status(200).json(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la liste.", error });
  }
};

// Fonction pour récupérer toutes les listes d'un utilisateur (watchlist et favorites)
exports.getUserLists = async (req, res) => {
  try {
    const { userId } = req.query;

    // Validation du paramètre userId
    if (!userId) {
      return res.status(400).json({
        message: "Le paramètre userId est obligatoire.",
      });
    }

    // Récupérer toutes les listes (watchlist et favorites)
    const lists = await List.findAll({
      where: { userId },
    });

    // Séparer les listes en deux : watchlist et favorites
    const watchlist = lists.filter((item) => item.type === "watchlist");
    const favorites = lists.filter((item) => item.type === "favorites");

    // Séparer les films et séries dans la watchlist
    const moviesWatchlist = watchlist.filter(
      (item) => item.workType === "film"
    );
    const seriesWatchlist = watchlist.filter(
      (item) => item.workType === "serie"
    );

    // Séparer les films et séries dans les favoris
    const moviesFavorites = favorites.filter(
      (item) => item.workType === "film"
    );
    const seriesFavorites = favorites.filter(
      (item) => item.workType === "serie"
    );

    // Renvoyer les résultats sous forme structurée
    return res.status(200).json({
      watchlist: {
        movies: moviesWatchlist,
        series: seriesWatchlist,
      },
      favorites: {
        movies: moviesFavorites,
        series: seriesFavorites,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des listes.",
      error: error.message,
    });
  }
};

// Fonction pour récupérer les détails d'une œuvre (film ou série) à partir de TMDB
exports.getWorkDetails = async (req, res) => {
  const { workId, workType } = req.params;

  // Validation du type d'œuvre (film ou série)
  if (workType !== "film" && workType !== "serie") {
    return res.status(400).json({ message: "Type d'œuvre non valide" });
  }

  try {
    let url = "";

    // Construction de l'URL pour la requête API en fonction du type d'œuvre
    if (workType === "film") {
      url = `https://api.themoviedb.org/3/movie/${workId}?api_key=${TMDB_API_KEY}`;
    } else if (workType === "serie") {
      url = `https://api.themoviedb.org/3/tv/${workId}?api_key=${TMDB_API_KEY}`;
    }

    // Requête API pour récupérer les détails de l'œuvre
    const response = await axios.get(url);

    res.status(200).json(response.data); // Renvoi des données obtenues de l'API
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'œuvre :",
      error.message
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des détails de l'œuvre.",
    });
  }
};
