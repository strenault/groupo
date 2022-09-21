const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User, Article, Comment, Sequelize } = require('../models');

// GET ALL USERS
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['email', 'password', 'createdAt', 'updatedAt'] },
  });
  res.status(200).send(users);
});

// GET USER BY ID
exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: { exclude: ['email', 'password', 'createdAt', 'updatedAt'] },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ user });
});

// GET CURRENT USER
exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.auth.userId,
    },
    attributes: ['id', 'role'],
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ user });
});

// UPDATE USER
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedData = req.body;
  const { userId } = req.params;

  // Si aucune image n'est jointe, imageUrl est définie sur undefined pour éviter d'écraser l'image actuelle
  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`
    : undefined;

  const user = await User.update(
    { ...updatedData, profilePic: imageUrl },
    { where: { id: userId }, returning: true, plain: true }
  );

  if (user[1] === 0) {
    return next(
      new AppError(
        "Aucun utilisateur correspondant à cet ID n'a été trouvé",
        404
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: "Le profil de l'utilisateur à été mis à jour",
  });
});

// DELETE USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const deletedUser = await User.destroy({
    where: { id: userId },
  });

  if (!deletedUser) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({ message: 'Utilisateur supprimé' });
});

// UPDATE PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, updatedPassword } = req.body;
  const { userId } = req.params;

  // We get the user information by their id
  const user = await User.findByPk(userId);

  // If no user is found we send an error
  if (!user) {
    return next(new AppError("Cet utilisateur n'existe pas", 404));
  }
  // else we check if the current password corresponds to the 'old' password sent in the request
  const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

  // if the passwords do not correspond we send a 403 Forbidden error
  if (!passwordIsValid) {
    return next(new AppError('Ancien mot de passe invalide', 403));
  }

  // else, we encrypt the new password and update the database
  const hash = await bcrypt.hash(updatedPassword, 10);
  await User.update(
    { password: hash },
    { where: { id: userId }, returning: false }
  );
  res
    .status(200)
    .json({ status: 'success', message: 'Le mot de passe a été mis à jour' });
});

// GET ARTICLES FROM USER
exports.getArticlesFromUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const articles = await Article.findAll({
    where: {
      userId: userId,
    },
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
