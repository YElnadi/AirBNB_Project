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
        email: 'Ali@gmail.com',
        username: 'Ali-G',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Ali',
        lastName: 'Ghoneim'
      },
      {
        email: 'Yasmine@gmail.com',
        username: 'Yasminaaa',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Yasmine',
        lastName: 'Elnadi'
      },
      {
        email: 'Mohamed@gmail.com',
        username: 'Ghooo',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Mohamed',
        lastName: 'Ghoneim'
      },
      {
        email: 'Omar@gmail.com',
        username: 'OmaR',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Omar',
        lastName: 'Elnadi'
      },
      {
        email: 'Mahmoud@gmail.com',
        username: 'Mido',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Mahmoud',
        lastName: 'Elnadi'
      },
      {
        email: 'Hend@gmail.com',
        username: 'Hendoo',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Hend',
        lastName: 'Zayed'
      },
      {
        email: 'Amal@gmail.com',
        username: 'Amoula',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'Amal',
        lastName: 'Nour'
      },
      {
        email: 'Adel@gmail.com',
        username: 'Adell',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'Adel',
        lastName: 'Elnadi'
      },
      {
        email: 'Faten@gmail.com',
        username: 'Tuna',
        hashedPassword: bcrypt.hashSync('password8'),
        firstName: 'Faten',
        lastName: 'Nour'
      },
      {
        email: 'Hadeel@gmail.com',
        username: 'dodo',
        hashedPassword: bcrypt.hashSync('password9'),
        firstName: 'Hadeel',
        lastName: 'Elsaadany'
      },
      {
        email: 'Nourhan@gmail.com',
        username: 'Nory',
        hashedPassword: bcrypt.hashSync('password10'),
        firstName: 'Nourhan',
        lastName: 'Anwar'
      },
      {
        email: 'Basma@gmail.com',
        username: 'Basoma',
        hashedPassword: bcrypt.hashSync('password11'),
        firstName: 'Basma',
        lastName: 'Khalaf'
      },
      {
        email: 'Menna@gmail.com',
        username: 'Manona',
        hashedPassword: bcrypt.hashSync('password12'),
        firstName: 'Menna',
        lastName: 'Hammad'
      },
      {
        email: 'Sarah@gmail.com',
        username: 'Soso',
        hashedPassword: bcrypt.hashSync('password13'),
        firstName: 'Sarah',
        lastName: 'Shawky'
      },
      {
        email: 'Dina@gmail.com',
        username: 'Dinaaa',
        hashedPassword: bcrypt.hashSync('password14'),
        firstName: 'Dina',
        lastName: 'Hagag'
      },
      {
        email: 'Malak@gmail.com',
        username: 'MalokaaHanem',
        hashedPassword: bcrypt.hashSync('password15'),
        firstName: 'Malak',
        lastName: 'Yousry'
      },
      {
        email: 'Mariam',
        username: 'Maryouma',
        hashedPassword: bcrypt.hashSync('password16'),
        firstName: 'Mariam',
        lastName: 'Gamal'
      },
      {
        email: 'Safi@gmail.com',
        username: 'Safsofaa',
        hashedPassword: bcrypt.hashSync('password17'),
        firstName: 'Safi',
        lastName: 'Mohamed'
      },
      {
        email: 'Mariamm@gmail.com',
        username: 'Maryouma1',
        hashedPassword: bcrypt.hashSync('password18'),
        firstName: 'mariam',
        lastName: 'Elhussany'
      },
      {
        email: 'Mossad@gmail.com',
        username: 'Mossad123',
        hashedPassword: bcrypt.hashSync('password19'),
        firstName: 'Ahmed',
        lastName: 'Mossad'
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
