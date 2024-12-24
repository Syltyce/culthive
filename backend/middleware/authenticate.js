// backend/middleware/authenticate.js

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilisez la variable d'environnement pour la clé secrète
    req.user = decoded; // Attache les informations de l'utilisateur à la requête
    next(); // Passe à la prochaine middleware ou à la route
  } catch (error) {
    res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = authenticate;
