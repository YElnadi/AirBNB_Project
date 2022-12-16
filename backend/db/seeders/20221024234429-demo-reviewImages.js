'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "ReviewImages"

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
         reviewId:1,
         url:"review image url1"
       },
       {
        reviewId:2,
        url:"review image url2"
       },
       {
        reviewId:3,
        url:"review image url3"
       },
       {
        reviewId:4,
        url:"review image url4"
       },
       {
        reviewId:5,
        url:"review image url5"
       }
     ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options,{
      url:["image url"]
    });
  }
};
