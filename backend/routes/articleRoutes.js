const express = require('express');

const router = express.Router();

// Nested routes
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');

// Controllers
const articleController = require('../controllers/articleController');

// Middlewares
const authentication = require('../middleware/authentication');
const grantAccess = require('../middleware/grantAccess');
const authorization = require('../middleware/authorization');
const multer = require('../middleware/multer');
const sharp = require('../middleware/sharp');
const {
  articleValidation,
} = require('../middleware/validation/articleValidation');

// Required models for authorization middleware
const { Article } = require('../models');

// Articles
router
  .route('/')
  .get(authentication, articleController.getAllArticle)
  .post(
    authentication,
    multer,
    sharp,
    articleValidation,
    articleController.createArticle
  );

router
  .route('/:articleId')
  .delete(
    authentication,
    grantAccess('moderator', 'admin'),
    authorization(Article),
    articleController.deleteArticle
  );

// Nested Comments and Likes routes
router.use('/:articleId/comments', commentRoutes);
router.use('/:articleId/likes', likeRoutes);

module.exports = router;
