const List = require("../models/List");
const User = require("../models/User");

const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Charge la clé depuis l'environnement

exports.addToList = async (req, res) => {
  try {
    const { userId, workId, type, workType } = req.body;

    // Validation basique
    if (!userId || !workId || !type || !workType) {
      return res.status(400).json({
        message:
          "Les champs userId, workId, type et workType sont obligatoires.",
      });
    }

    // Vérifie si l'utilisateur existe
    const user = await User.findByPk(userId); // Assurez-vous que `User` est bien importé
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

    // Ajout de l'œuvre à la liste
    const newEntry = await List.create({ userId, workId, type, workType });
    return res.status(201).json({
      message: `${workType === "film" ? "Le film" : "La série"} a été ajouté
      à la liste " ${type} " de l'utilisateur ${userId}.`,
      data: newEntry,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la liste :", error); // Pour le débogage
    return res.status(500).json({
      message: "Erreur lors de l'ajout à la liste.",
      error: error.message,
    });
  }
};

exports.removeFromList = async (req, res) => {
  try {
    const { userId, workId, type } = req.body;

    const deleted = await List.destroy({ where: { userId, workId, type } });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Aucune œuvre trouvée dans la liste." });
    }

    res.status(200).json({ message: "Œuvre supprimée de la liste." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression.", error });
  }
};

exports.getList = async (req, res) => {
  try {
    const { userId, type } = req.query;

    const list = await List.findAll({ where: { userId, type } });
    res.status(200).json(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la liste.", error });
  }
};

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
      // Aucune restriction sur le type, on récupère tout (watchlist et favorites)
    });

    // Séparer les listes en deux : watchlist et favorites
    const watchlist = lists.filter(item => item.type === 'watchlist');
    const favorites = lists.filter(item => item.type === 'favorites');

    // Séparer les films et séries dans la watchlist
    const moviesWatchlist = watchlist.filter(item => item.workType === 'film');
    const seriesWatchlist = watchlist.filter(item => item.workType === 'serie');

    // Séparer les films et séries dans les favoris
    const moviesFavorites = favorites.filter(item => item.workType === 'film');
    const seriesFavorites = favorites.filter(item => item.workType === 'serie');

    // Renvoyer les résultats sous forme structurée
    return res.status(200).json({
      watchlist: {
        movies: moviesWatchlist,
        series: seriesWatchlist,
      },
      favorites: {
        movies: moviesFavorites,
        series: seriesFavorites,
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des listes.",
      error: error.message,
    });
  }
};

exports.getWorkDetails = async (req, res) => {
  const { workId, workType } = req.params;

  // Validation du workType
  if (workType !== 'film' && workType !== 'serie') {
    return res.status(400).json({ message: 'Type d\'œuvre non valide' });
  }

  try {
    let url = '';

    // Logique selon le type d'œuvre
    if (workType === 'film') {
      url = `https://api.themoviedb.org/3/movie/${workId}?api_key=${TMDB_API_KEY}`;
    } else if (workType === 'serie') {
      url = `https://api.themoviedb.org/3/tv/${workId}?api_key=${TMDB_API_KEY}`;
    }

    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'œuvre :", error.message);
    res.status(500).json({
      message: "Erreur lors de la récupération des détails de l'œuvre.",
    });
  }
};


