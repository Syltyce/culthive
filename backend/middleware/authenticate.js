// backend/middleware/authenticate.js

// Importation du module jsonwebtoken pour manipuler les tokens JWT
const jwt = require("jsonwebtoken");

// Middleware d'authentification
const authenticate = (req, res, next) => {
  // Récupérer le token à partir des en-têtes de la requête (Authorization: Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];

  // Vérifier si un token est présent dans la requête
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    // Vérifier et décoder le token à l'aide de la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilisez la variable d'environnement pour la clé secrète
    req.user = decoded; // Attache les informations de l'utilisateur à la requête
    next(); // Passe à la prochaine middleware ou à la route
  } catch (error) {
    // Si la vérification du token échoue (par exemple, token expiré ou invalide), retourner une erreur 403
    res.status(403).json({ message: "Token invalide" });
  }
};

// Exposer le middleware pour l'utiliser ailleurs dans l'application
module.exports = authenticate;
