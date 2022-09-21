const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User } = require('../models');

const key = CryptoJS.enc.Hex.parse(process.env.ENCRYPT_SECRET);

// SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  const { email, ...userData } = req.body;

  // Hash password before storage in database
  const hash = await bcrypt.hash(req.body.password, 10);

  // Chiffrer l'e-mail de l'utilisateur avant de le stocker dans la base de données
  const encryptedEmail = CryptoJS.AES.encrypt(email, key, {
    mode: CryptoJS.mode.ECB,
  }).toString();

  const [user, created] = await User.findOrCreate({
    where: { email: encryptedEmail },
    defaults: {
      ...userData,
      email: encryptedEmail,
      password: hash,
    },
  });

  if (!created) {
    return next(
      new AppError(
        'Compte déjà existant. Veuillez vous connecter ou choisir un autre email',
        400
      )
    );
  }
  res.status(201).json({ message: 'Utilisateur créé' });
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Chiffrer l'e-mail avant la comparaison avec l'e-mail du magasin dans la base de données
  const encryptedEmail = CryptoJS.AES.encrypt(email, key, {
    mode: CryptoJS.mode.ECB,
  }).toString();

  const user = await User.findOne({
    where: {
      email: encryptedEmail,
    },
  });
  // if user exists
  if (!user) {
    return next(new AppError('Combinaison email / mot de passe invalide', 401));
  }

  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  // and password is valid
  if (!passwordIsValid) {
    return next(new AppError('Combinaison email / mot de passe invalide', 401));
  }

  // envoie le jeton d'authentification
  res.status(200).json({
    token: jwt.sign(
      { userId: user.id, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      }
    ),
  });
});
