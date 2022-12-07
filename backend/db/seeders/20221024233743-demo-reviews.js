'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Reviews"
const {Review, Spot, User} =require('../models')
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
      userId:2,
      review: "This was an awesome spot!",
      stars: 5
     },
     {
      spotId:2,
      userId:3,
      review: "This was an awesome spot!",
      stars: 5
     },
     {
      spotId:3,
      userId:4,
      review: "This was an awesome spot!",
      stars: 5
     },
     {
      spotId:4,
      userId:5,
      review: "This was an awesome spot!",
      stars: 5
     },
    {
      spotId:5,
      userId:6,
      review: "This was an awesome spot!",
      stars: 5
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
    return queryInterface.bulkDelete(options,{
      review:["This was an awesome spot!"],
      stars:[5]
    },{});
  }
};
