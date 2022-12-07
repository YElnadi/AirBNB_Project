'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"

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
         spotId:1,
         url:"https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/f0da72bc-28b2-44bd-b3dc-9cb1e1ba946b.jpeg?im_w=1200",
         preview:true
       },
       {
        spotId:2,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-30109719/original/601996fa-4df1-4978-a7fd-c56c4078a3b0.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:3,
        url:"https://a0.muscache.com/im/pictures/9c6f8dd9-9758-4ef3-80b0-16cdbbda5118.jpg?im_w=1440",
        preview:true
       },
       {
        spotId:4,
        url:"https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/0f9f7471-ddc1-4eed-a25a-2df69f5bae0e.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:5,
        url:"https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg?im_w=1200",
        preview:true
       },
       {
        spotId:6,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/22a2c42e-108b-4809-b274-ada4f3d6da28.jpeg?im_w=1200",
        preview:true
       },
       {
       spotId:7,
       url:"https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/17b49e69-a3b4-4f80-8068-868a3892d6cc?im_w=1200",
       preview:true
      },
      {
        spotId:8,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-51165983/original/3a6e9b62-da6b-4a76-af0b-003eafc7b8ec.jpeg?im_w=1200",
        preview:true
       },
       {
         spotId:9,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-51234810/original/13adc83e-212b-4471-b6e9-221a464cfc05.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:10,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-51067890/original/832b807f-f8bc-4e5f-8192-713782fc6073.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:11,
        url:"https://a0.muscache.com/im/pictures/900639be-e2bc-49cb-a989-cd447f53e03a.jpg?im_w=1200",
        preview:true
       },
       {
        spotId:12,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-12432842/original/a0abf694-f082-4baf-9adc-c7ae93fe025d.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:13,
        url:"https://a0.muscache.com/im/pictures/e1a816a3-2c39-47e4-919d-8880f4eb59c5.jpg?im_w=1200",
        preview:true
       },
       {
        spotId:14,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-49717286/original/f44d0afd-90c6-469d-bed8-bfcaa5ce4f99.jpeg?im_w=1200",
        preview:true
       },
       {spotId:15,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/6c44b60d-aedb-48f4-bb3e-8d78d442c660.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:16,
        url:"https://a0.muscache.com/im/pictures/6b6bd8d9-9734-4925-8f90-2f7806b43c8b.jpg?im_w=1200",
        preview:true
       },
       {
        spotId:17,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-581179430693490727/original/5296ec95-7ba1-4e4c-ae6b-366cf50b1918.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:18,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-53058812/original/734016f0-6ab8-47b1-9690-b3ca373f6e5d.jpeg?im_w=1200",
        preview:true
       },
       {
        spotId:19,
        url:"https://a0.muscache.com/im/pictures/8b29bbe1-fe0a-4a32-9dba-1af15dbde880.jpg?im_w=1200",
        preview:true
       },
       {
        spotId:20,
        url:"https://a0.muscache.com/im/pictures/caf13aea-27ca-4134-a45d-c83e89894b04.jpg?im_w=1200",
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
     return queryInterface.bulkDelete(options,{
       url:['image url'],
       preview:[true]
     },{})
  }
};
