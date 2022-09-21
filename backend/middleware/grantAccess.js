// Accorder l'autorisation aux modérateurs et/ou administrateurs
module.exports =
  (...roles) =>
  (req, res, next) => {
    // Nous vérifions si l'utilisateur actuel a un rôle autorisé
    const isAuthorized = roles.includes(req.auth.role);

    req.auth.isAuthorized = isAuthorized;

    next();
  };
