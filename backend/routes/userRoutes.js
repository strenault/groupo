const express = require('express');

const router = express.Router();

// Controller
const userCtrl = require('../controllers/userController');

// Middlewares
const authentication = require('../middleware/authentication');
const grantAccess = require('../middleware/grantAccess');
const authorization = require('../middleware/authorization');
const { userValidation } = require('../middleware/validation/userValidation');
const {
  passwordValidation,
} = require('../middleware/validation/passwordValidation');
const multer = require('../middleware/multer');
const sharp = require('../middleware/sharp');

// Required models for authorization middleware
const { User } = require('../models');

router.route('/').get(authentication, userCtrl.getAllUser);
router.route('/current').get(authentication, userCtrl.getCurrentUser);
router
  .route('/:userId/profile')
  .put(
    authentication,
    authorization(User),
    multer,
    sharp,
    userValidation,
    userCtrl.updateUser
  );
router
  .route('/:userId/password')
  .put(
    authentication,
    authorization(User),
    multer,
    passwordValidation,
    userCtrl.updatePassword
  );
router
  .route('/:userId/articles')
  .get(authentication, userCtrl.getArticlesFromUser);

router
  .route('/:userId')
  .get(authentication, userCtrl.getUser)
  .delete(
    authentication,
    grantAccess('admin'),
    authorization(User),
    userCtrl.deleteUser
  );

module.exports = router;
