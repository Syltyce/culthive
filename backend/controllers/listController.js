const List = require("../models/List");
const User = require("../models/User");

const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Charge la clé depuis l'environnement

exports.addToList = async (req, res) => {
  try {
    const { userId, workId, type } = req.body;

    // Validation basique
    if (!userId || !workId || !type) {
      return res.status(400).json({
        message: "Les champs userId, workId et type sont obligatoires.",
      });
    }

    // Vérifie si l'utilisateur existe
    const user = await User.findByPk(userId); // Assurez-vous que `User` est bien importé
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifie si l'œuvre existe déjà dans la liste
    const existingEntry = await List.findOne({
      where: { userId, workId, type },
    });
    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "Cette œuvre est déjà dans la liste." });
    }

    // Ajout de l'œuvre à la liste
    const newEntry = await List.create({ userId, workId, type });
    return res.status(201).json({
      message: "Ajouté à la liste avec succès.",
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

    // Récupérer toutes les listes de l'utilisateur
    const userLists = await List.findAll({
      where: { userId },
    });

    if (userLists.length === 0) {
      return res.status(404).json({
        message: "Aucune liste trouvée pour cet utilisateur.",
      });
    }

    return res.status(200).json(userLists);
  } catch (error) {
    console.error("Erreur lors de la récupération des listes:", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des listes.",
      error: error.message,
    });
  }
};

exports.getWorkDetails = async (req, res) => {
  const { workId } = req.params;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${workId}?api_key=${TMDB_API_KEY}`
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'œuvre :", error.message);
      res.status(500).json({ message: "Erreur lors de la récupération des détails de l'œuvre." });
    }
};

