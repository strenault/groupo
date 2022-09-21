const jwt = require('jsonwebtoken');

// Authentication
module.exports = (req, res, next) => {
  try {
    let token;
    // Vérifie si un jeton d'authentification est fourni
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      throw new Error('Requête non authentifiée');
    }

    // Vérifier la validité du jeton d'authentification
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId, role } = decodedToken;

    // Append userId and role to the request
    req.auth = { userId, role };
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
