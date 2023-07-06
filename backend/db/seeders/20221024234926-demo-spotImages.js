'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"


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
         spotId:1,
         url:"https://yasbnb.s3.us-west-2.amazonaws.com/iamge1.webp",
         preview:true
       },
       {
        spotId:2,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image2.webp",
        preview:true
       },
       {
        spotId:3,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image3.webp",
        preview:true
       },
       {
        spotId:4,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image4.webp",
        preview:true
       },
       {
        spotId:5,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image5.webp",
        preview:true
       },
       {
        spotId:6,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image6.webp",
        preview:true
       },
       {
       spotId:7,
       url:"https://yasbnb.s3.us-west-2.amazonaws.com/image7.webp",
       preview:true
      },
      {
        spotId:8,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image8.webp",
        preview:true
       },
       {
         spotId:9,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image9.webp",
        preview:true
       },
       {
        spotId:10,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image10.webp",
        preview:true
       },
       {
        spotId:11,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image11.webp",
        preview:true
       },
       {
        spotId:12,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image12.webp",
        preview:true
       },
       {
        spotId:13,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image13.webp",
        preview:true
       },
       {
        spotId:14,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image14.webp",
        preview:true
       },
       {spotId:15,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image15.webp",
        preview:true
       },
       {
        spotId:16,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image16.webp",
        preview:true
       },
       {
        spotId:17,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/cc3a98b7-d83e-4684-bb03-2b2ce6dd480d.webp",
        preview:true
       },
       {
        spotId:18,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image18.webp",
        preview:true
       },
       {
        spotId:19,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image19.webp",
        preview:true
       },
       {
        spotId:20,
        url:"https://yasbnb.s3.us-west-2.amazonaws.com/image20.webp",
        preview:true
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
       url:['image url'],
       preview:[true]
     })
  }
};
