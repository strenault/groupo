'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'likes',
      [
        {
          isLiked: true,
          articleId: 1,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 2,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 1,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 3,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 3,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isLiked: true,
          articleId: 4,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('likes', null, {});
  },
};
