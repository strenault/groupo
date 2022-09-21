const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { Article, User, Comment, Sequelize } = require('../models');

// GET ALL ARTICLES
exports.getAllArticle = catchAsync(async (req, res, next) => {
  const articles = await Article.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'image',
      'createdAt',
      [
        Sequelize.fn('COUNT', Sequelize.col('Comment.articleId')),
        'commentsCount',
      ],
    ],
    group: ['id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstname', 'lastname', 'profilePic'],
      },
      {
        model: Comment,
        as: 'comment',
        attributes: [],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  if (!articles) {
    return next(new AppError('Aucun article pour le moment.', 400));
  }

  res.status(200).json(articles);
});

// CREATE ARTICLE
exports.createArticle = catchAsync(async (req, res, next) => {
  const { userId } = req.auth;
  const { title, content } = req.body;

  // If an image is attached, provide image URL
  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/article/${req.file.filename}`
    : undefined;

  const article = await Article.create({
    title: title,
    content: content,
    image: imageUrl,
    userId: userId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
});

// DELETE ARTICLE
exports.deleteArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params;
  const deletedArticle = await Article.destroy({
    where: {
      id: articleId,
    },
  });

  if (!deletedArticle) {
    return next(new AppError('No article found with that ID', 404));
  }
  res.status(200).json({ status: 'success', message: 'Article supprimé' });
});
