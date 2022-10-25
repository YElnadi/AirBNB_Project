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
   return queryInterface.bulkInsert('Bookings',[
     {
      startDate: "2021-11-19",
      endDate: "2021-11-20",
     },
     {
      startDate: "2021-11-19",
      endDate: "2021-11-20",
     },
    {
      startDate: "2021-11-19",
      endDate: "2021-11-20",
    },
    {
      startDate: "2021-11-19",
      endDate: "2021-11-20",
    },
    {
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
    return queryInterface.bulkDelete('Bookings',{
      startDate:["2021-11-19"],
      endDate:["2021-11-20"]
    },{});
  }
};
