'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          content: "Bonjour Sophie,  merci c'est un bon commencement!",
          articleId: 1,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'je vous souhaite une agréable journée.',
          articleId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'merci pour ce post, je vous souhaite une bonne journée',
          articleId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'bonne et agréable journée Stephane',
          articleId: 2,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'douce et agréable journée Sophie',
          articleId: 1,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'adorable',
          articleId: 4,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Et oui, on laisse tout à la maison!',
          articleId: 3,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
