'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'qxU+GmDsIzIpdaUO83JvvHhPGnKwP9iLtCO+LxXOsAI=',
          password:
            '$2b$10$a007skwMpvM6iKBvpg7kQ.3p/PUSyKyJmM4116bMXmxf9y096mbo.',
          role: 'admin',
          firstname: 'Groupomania',
          lastname: 'Admin',
          profilePic:
            'http://localhost:8080/images/user/default-profile.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.twitter.com/',
          facebookProfile: 'https://www.facebook.com/',
          instagramProfile: 'https://www.instagram.com/',
          bio: "Je peux supprimer: des Profils, des Articles et des Commentaires.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: '8v83GKmIzui7qnO9Z30/cLaqJo3TqQlFZKeTnV0Y4oA=',
          password:
            '$2b$10$R9Alxqe3fzb3aZ8OGLkGlu6/2WutYuroKDMUuaD9L1SX353r7..fS',
          role: 'moderator',
          firstname: 'Groupomania',
          lastname: 'Modérateur',
          profilePic:
            'http://localhost:8080/images/user/red-fox-sits-in-green-grassy-field1662552665266.jpg',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: '',
          facebookProfile: '',
          instagramProfile: '',
          bio: 'Je peux supprimer des articles, des commentaires.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'oxBZ6BlRhu3ZuPaBl5/M7pwJIt4LVsRf2Xgd6QVbb9U=',
          password:
            '$2b$10$x1vgo8kl4z0s7RqLahf/V.A8EMRaxLtp9ktmEFPgrB2kvTo8vpTX.',
          role: 'user',
          firstname: 'Stephane',
          lastname: 'Renault',
          profilePic: 'http://localhost:8080/images/user/default-profile.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.linkedin.com/',
          facebookProfile: '',
          instagramProfile: '',
          bio: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: '48HW/2Em3WXk2sHZH82CAyOVHMXPEmd44ZmA2PYqkcE=',
          password:
            '$2b$10$715gGD/FwQ31lCTBZvKxRuAzWOlDD76wJ1GC0Mk6tPPoUFUoxaFkm',
          role: 'user',
          firstname: 'Sophie',
          lastname: 'Renault',
          profilePic: 'http://localhost:8080/images/user/default-profile.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.linkedin.com/',
          facebookProfile: '',
          instagramProfile: '',
          bio: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
