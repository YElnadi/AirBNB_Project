'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Users"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password8'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password9'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password10'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user11@user.io',
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password11'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user12@user.io',
        username: 'FakeUser12',
        hashedPassword: bcrypt.hashSync('password12'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user13@user.io',
        username: 'FakeUser13',
        hashedPassword: bcrypt.hashSync('password13'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user14@user.io',
        username: 'FakeUser14',
        hashedPassword: bcrypt.hashSync('password14'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user15@user.io',
        username: 'FakeUser15',
        hashedPassword: bcrypt.hashSync('password15'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user16@user.io',
        username: 'FakeUser16',
        hashedPassword: bcrypt.hashSync('password16'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user17@user.io',
        username: 'FakeUser17',
        hashedPassword: bcrypt.hashSync('password17'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user18@user.io',
        username: 'FakeUser18',
        hashedPassword: bcrypt.hashSync('password18'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user19@user.io',
        username: 'FakeUser19',
        hashedPassword: bcrypt.hashSync('password19'),
        firstName: 'demo',
        lastName: 'user'
      },
     

    ], {});
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {
       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
     }, {});
   
  }
};
