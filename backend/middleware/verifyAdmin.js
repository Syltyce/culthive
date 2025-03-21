const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé : administrateur uniquement" });
    }
    next();
  } catch (error) {
    console.error("Erreur de vérification de l'administrateur :", error);
    res.status(401).json({ message: "Authentification échouée", error: error.message });
  }
};

module.exports = verifyAdmin;
