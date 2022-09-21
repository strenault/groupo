const { Comment, Article, User } = require('../models');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET ALL COMMENTS FROM ARTICLE
exports.getAllComment = catchAsync(async (req, res, next) => {
  const { articleId } = req.params;
  const comments = await Comment.findAll({
    where: {
      articleId: articleId,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstname', 'lastname', 'profilePic'],
      },
    ],
    order: [['createdAt', 'ASC']],
  });
  res.status(200).json(comments);
});

// CREATE COMMENT
exports.createComment = catchAsync(async (req, res, next) => {
  const commentData = req.body;
  const authorId = req.auth.userId;
  const { articleId } = req.params;

  const article = await Article.findByPk(articleId);
  if (!article) {
    return next(new AppError('Aucun article trouvé avec cet ID', 404));
  }
  const comment = await Comment.create({
    ...commentData,
    userId: authorId,
    articleId: articleId,
  });

  res.status(201).json({ status: 'success', data: comment });
});

// DELETE COMMENT
exports.deleteComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const deletedComment = await Comment.destroy({
    where: {
      id: commentId,
    },
  });
  if (!deletedComment) {
    return next(new AppError('No comment found with that ID', 404));
  }
  res.status(200).json({ status: 'success', message: 'Commentaire supprimé' });
});
