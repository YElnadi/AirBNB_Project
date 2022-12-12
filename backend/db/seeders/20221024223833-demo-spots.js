'use strict';
const {User,Spot} = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots'

const spots = [
  {
    ownerId: 1,
    address:"123 Disney Lane",
    city:"Index",
    state:"Washington",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"The Treeframe Cabin",
    description:"Outrageously beautiful modern treehouse aframe cabin perched 13ft off the ground between 4 evergreen trees.  Brand new with luxurious finishes, a two person hot tub, full bathroom, fireplace, giant skylights, and a king bed sleeping loft.  We proudly donate portions of guest proceeds to The Sierra Club, Forterra (saved Lake Serene Trail), WTA, and The Tulalip Foundation.",
    price:530,
   },
   {
    ownerId: 2,
    address:"123 Disney Lane",
    city:"Granite Falls",
    state:"Washington",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Canyon Creek Cabins: #1",
    description:"Perched high on a granite ledge, you will find this cabin overlooking a rushing river that weaves its way through the dense, lush forest of the North Cascade mountains. The unique asymmetrical A-frame structure is both unexpected and familiar, with its wood-clad walls, exposed beams, and large geometric windows. Whether you are playing whiskey-fueled card game by the fire, or lounging in the hottub while listening to the nearby rushing creek, this cabin offers the ultimate cabin experience.",
    price:397,
   },
  {
    ownerId: 3,
    address:"123 Disney Lane",
    city:"Seattle",
    state:"Washington",
    country:"United States of America",
    lat:37.7645358,
    lng:-122.4730327,
    name:"A Frame Architectural Retreat with Lego Kitchen",
    description:"Enjoy a peaceful, quiet Vacation or a local getaway in this unique architectural A-Frame retreat. This private home is set back from the street on a secluded wooded lot. One block from Matthew's Beach & playground and Burke-Gillman biking/jogging trail. This bright, light filled home is full of bold color choices and eclectic furnishings. Lego themed kitchen comes with a Lego search and find activity along with games",
    price:512,
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
    price:397,
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
  up: async (queryInterface, Sequelize) =>{
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  return queryInterface.bulkInsert(options,spots,{})

  // for (let spotInfo of spots) {
  //   const { ownerId,address,city,state,country,lat,lng,name,description,price} = spotInfo;
  //   await Spot.create({
  //     ownerId,
  //     address,
  //     city,
  //     state,
  //     country,
  //     lat,
  //     lng,
  //     name,
  //     description,
  //     price
  //  });
  // }


   },

  down: async  (queryInterface, Sequelize) =>{
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
     city:{[Op.in]:['San Francisco']}

    },{})
  }
};
