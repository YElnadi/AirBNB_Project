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
     return queryInterface.bulkInsert('SpotImages', [
       {
         spotId:1,
         url:"spot image url1",
         preview:true
       },
       {
        spotId:2,
        url:"spot image url2",
        preview:true
       },
       {
        spotId:3,
        url:"spot image url3",
        preview:true
       },
       {
        spotId:4,
        url:"spot image url14",
        preview:true
       },
       {
        spotId:5,
        url:"spot image url5",
        preview:true
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
     return queryInterface.bulkDelete('SpotImages',{
       url:['image url'],
       preview:[true]
     },{})
  }
};
