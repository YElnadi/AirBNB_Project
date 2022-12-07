'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Bookings"
const {Spot, User} = require('../models')
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
   return queryInterface.bulkInsert(options,[
     {
      spotId:1,
      userId:1,
      startDate: "2021-11-19",
      endDate: "2021-11-20",
     },
     {
      spotId:2,
      userId:2,
      startDate: "2021-11-19",
      endDate: "2021-11-20",
     },
    {
      spotId:3,
      userId:3,
      startDate: "2021-11-19",
      endDate: "2021-11-20",
    },
    {
      spotId:4,
      userId:4,
      startDate: "2021-11-19",
      endDate: "2021-11-20",
    },
    {
      spotId:5,
      userId:5,
      startDate: "2021-11-19",
      endDate: "2021-11-20",
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      startDate:["2021-11-19"],
      endDate:["2021-11-20"]
    },{});
  }
};
