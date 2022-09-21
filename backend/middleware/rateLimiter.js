const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // Limite chaque IP à 25 requêtes par `window` (ici, par 5 minutes)
  message:
    'Trop de tentatives de connexion, veuillez réessayer dans 5 minutes.',
  standardHeaders: true, // Renvoie les informations de limite de taux dans les en-têtes `RateLimit-*`
  legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*`
});
