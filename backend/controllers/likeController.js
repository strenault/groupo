const { Like, Article } = require('../models');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.likeHandle = catchAsync(async (req, res, next) => {
  const { userId } = req.auth;
  const { articleId } = req.params;
  const { isLiked } = req.body;

  // Check if article exists
  const article = await Article.findByPk(articleId);
  if (!article) {
    return next(new AppError('Aucun article trouvé avec cet ID', 404));
  }

  // If isLiked is true, we check if the like already exists, otherwise we create it
  if (isLiked) {
    const [like, created] = await Like.findOrCreate({
      where: { userId: userId, articleId: articleId },
      defaults: {
        userId: userId,
        articleId: articleId,
        isLiked: true,
      },
    });

    // If it already exists we send back an error
    if (!created) {
      if (!like.isLiked) {
        await like.update({ isLiked: false });
        return res
          .status(200)
          .json({ status: 'success', message: 'Like ajouté' });
      }
      return next(new AppError('Vous aimez déjà cet article', 400));
    }
    return res.status(201).json({ status: 'success', message: 'Like ajouté' });
  }

  // If isLiked is false (unlike) we destroy existant like
  const deletedLike = await Like.destroy({
    where: {
      userId: userId,
      articleId: articleId,
    },
  });

  // Or send and error message if the like doesn't exist
  if (!deletedLike) {
    return next(
      new AppError('Vous ne pouvez supprimer un like inexistant', 400)
    );
  }
  res.status(200).json({ status: 'success', message: 'Like supprimé' });
});

exports.getLikesFromArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params;

  // Check if article exists
  const article = await Article.findByPk(articleId);
  if (!article) {
    return next(new AppError('Aucun article trouvé avec cet ID', 404));
  }
  const likes = await Like.findAll({
    where: {
      articleId: articleId,
    },
    attributes: ['userId'],
  });

  res.status(201).json(likes);
});
