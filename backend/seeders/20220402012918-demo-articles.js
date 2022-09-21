'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'articles',
      [
        {
          title: 'React developpez le Front-End',
          content:
            'installation des outils requis NodeJS, Visual Sudio Code creation du premier projet React npx create-react-app frontend',
          image:
            'http://localhost:8080/images/article/creation_react1662393652372.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4,
        },
        {
          title: 'une petite photo',
          content:
            'le serveur avec Node JS, express MySQL, Sequelize phpmyadmin',
          image: 'http://localhost:8080/images/article/seed-article216501007281751662394172772.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: 'un pc portable',
          content:
            'un départ en vacance',
          image:
            'http://localhost:8080/images/article/a-bright-window-lite-room-shows-a-home-office1662552859223.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: 'la photo sympa',
          content:
            'Il est si craquant.Une toute petite peluche!',
          image:
            'http://localhost:8080/images/article/small-kitten-with-bright-blue-eyes1662553017938.jpg,'
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: 'le self est ouvert!!',
          content:
            'une petite pensée, pour nos vacances.',
          image:
            'http://localhost:8080/images/article/a-fire-by-the-lake1662553930395.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  },
};
