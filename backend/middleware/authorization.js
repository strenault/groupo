const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User, Article, Comment } = require('../models');

// Autorisation d'accès à une ressource
module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const reqUserId = req.auth.userId;
    const hasAccess = req.auth.isAuthorized;
    let objectId;

    // En fonction de l'objet auquel l'utilisateur tente d'accéder, nous spécifions le paramètre à vérifier
    if (Model === User) {
      objectId = req.params.userId;
    } else if (Model === Article) {
      objectId = req.params.articleId;
    } else if (Model === Comment) {
      objectId = req.params.commentId;
    }

    // Nous interrogeons le document auquel l'utilisateur souhaite accéder dans la base de données
    const object = await Model.findOne({
      where: {
        id: objectId,
      },
    });
    if (!object) {
      return next(new AppError('Aucun élément trouvé avec cet ID', 404));
    }

    // Configuration de l'identifiant que nous voulons vérifier, en fonction du modèle
    const ownerId = Model === User ? object.id : object.userId;

    // L'utilisateur ne peut avoir accès à la ressource que s'il est le propriétaire de la ressource
    // ou si leur rôle leur en donne accès
    if (ownerId !== reqUserId && !hasAccess) {
      return next(new AppError('Requête non autorisée', 403));
    }

    next();
  });
