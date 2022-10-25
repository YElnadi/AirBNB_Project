'use strict';

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
   return queryInterface.bulkInsert("Reviews",[
     {
      review: "This was an awesome spot!",
      stars: 5
     },
     {
      review: "This was an awesome spot!",
      stars: 5
     },
     {
      review: "This was an awesome spot!",
      stars: 5
     },
     {
      review: "This was an awesome spot!",
      stars: 5
     },
    {
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
    return queryInterface.bulkDelete("Reviews",{
      review:["This was an awesome spot!"],
      stars:[5]
    },{});
  }
};
