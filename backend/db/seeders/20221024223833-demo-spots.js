'use strict';
const {User,Spot} = require('../models')

const spots = [
  {
    ownerId: 1,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
   },
   {
    ownerId: 2,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
   },
  {
    ownerId: 3,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    ownerId: 4,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    ownerId: 5,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    ownerId: 6,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    ownerId: 7,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 8,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 9,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 10,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 11,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 12,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 13,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 14,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 15,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 16,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 17,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 18,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    
    ownerId: 19,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  },
  {
    ownerId: 20,
    address:"123 Disney Lane",
    city:"San Francisco",
    state:"California",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"App Academy",
    description:"Place where web developers are created",
    price:123,
  }




]

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
  //  return queryInterface.bulkInsert("Spots",[
  //    {
      
  //     address:"123 Disney Lane",
  //     city:"San Francisco",
  //     state:"California",
  //     country:"United States of America",
  //     lat:37.7645358,
  //     lng:-122.4730327,
  //     name:"App Academy",
  //     description:"Place where web developers are created",
  //     price:123,
  //    },
  //    {
      
  //     address:"123 Disney Lane",
  //     city:"San Francisco",
  //     state:"California",
  //     country:"United States of America",
  //     lat:37.7645358,
  //     lng:-122.4730327,
  //     name:"App Academy",
  //     description:"Place where web developers are created",
  //     price:123,
  //    },
  //   {
      
  //     address:"123 Disney Lane",
  //     city:"San Francisco",
  //     state:"California",
  //     country:"United States of America",
  //     lat:37.7645358,
  //     lng:-122.4730327,
  //     name:"App Academy",
  //     description:"Place where web developers are created",
  //     price:123,
  //   },
  //   {
      
  //     address:"123 Disney Lane",
  //     city:"San Francisco",
  //     state:"California",
  //     country:"United States of America",
  //     lat:37.7645358,
  //     lng:-122.4730327,
  //     name:"App Academy",
  //     description:"Place where web developers are created",
  //     price:123,
  //   },
  //   {
      
  //     address:"123 Disney Lane",
  //     city:"San Francisco",
  //     state:"California",
  //     country:"United States of America",
  //     lat:37.7645358,
  //     lng:-122.4730327,
  //     name:"App Academy",
  //     description:"Place where web developers are created",
  //     price:123,
  //   }
  //  ])

  for (let spotInfo of spots) {
    const { ownerId,address,city,state,country,lat,lng,name,description,price} = spotInfo;
    await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
   });
  }


   },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Spots',{
      address:["123 Disney Lane"],
      city:["San Francisco"],
      state:["California"],
      country:["United States of America"],
      lat:[37.7645358],
      lng:[-122.4730327],
      name:["App Academy"],
      description:["Place where web developers are created"],
      price:[123]

    },{})
  }
};
