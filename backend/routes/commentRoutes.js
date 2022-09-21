const express = require('express');

// Controller
const commentController = require('../controllers/commentController');

// Nested router
const router = express.Router({ mergeParams: true });

// Middlewares
const authentication = require('../middleware/authentication');
const grantAccess = require('../middleware/grantAccess');
const authorization = require('../middleware/authorization');

// Required models for authorization middleware
const { Comment } = require('../models');

const {
  commentValidation,
} = require('../middleware/validation/commentValidation');

router
  .route('/')
  .post(authentication, commentValidation, commentController.createComment)
  .get(authentication, commentController.getAllComment);

router
  .route('/:commentId')
  .delete(
    authentication,
    grantAccess('moderator', 'admin'),
    authorization(Comment),
    commentController.deleteComment
  );

module.exports = router;
