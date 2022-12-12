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
    country:"United States",
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
    country:"United States",
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
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"A Frame Architectural Retreat with Lego Kitchen",
    description:"Enjoy a peaceful, quiet Vacation or a local getaway in this unique architectural A-Frame retreat. This private home is set back from the street on a secluded wooded lot. One block from Matthew's Beach & playground and Burke-Gillman biking/jogging trail. This bright, light filled home is full of bold color choices and eclectic furnishings. Lego themed kitchen comes with a Lego search and find activity along with games",
    price:512,
  },
  {
    ownerId: 4,
    address:"123 Disney Lane",
    city:"Bend",
    state:"Oregon",
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Private Luxury Cabin on Tumalo Lake near town",
    description:"The stunning Lakeside West Cabin (3 bedroom/3.5 bath, sleeps 8) overlooks Tumalo Lake with cozy wood-burning stove, private hot tub, and amazing views. 12 mi to downtown Bend, 45 min to Mt Bachelor and 4 mi to Tumalo Falls. Immerse in nature and be as active as you choose: hiking, mountain biking, fishing, wildlife viewing, stargazing, complimentary canoes, kayaks, SUPs, snowshoeing, sledding, hammock, horseshoe and corn hole game; lakeside deck with chairs, picnic table and fire pit (shared).",
    price:360,
  },
  {
    ownerId: 5,
    address:"123 Disney Lane",
    city:"Emigrant",
    state:"Montana",
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Carbella Cabin - Over 70 Acres Overlooking Tom Min",
    description:"his charming two-bedroom, two-bath cabin is perched on a hillside just minutes from Yellowstone National Park. It offers spectacular views of the Yellowstone River valley and the surrounding mountains. The property consists of over 70 acres, offering private ...",
    price:233,
  },
  {
    ownerId: 6,
    address:"123 Disney Lane",
    city:"Bend",
    state:"Oregon",
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Dome Sweet Dome: An OMG! Experience",
    description:"Renovated & stylishly redecorated in 2019, this true-to-name Geodesic Dome sits on a private & quiet lot in the First-on-the-Hill neighborhood.",
    price:154,
  },
  {
    ownerId: 7,
    address:"123 Disney Lane",
    city:"Packwood",
    state:"Washington",
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Heartwood Cabin at Mt. Rainier",
    description:"Welcome to Heartwood Cabin, our brand new custom A-Frame located in a small community off Canon Rd in Packwood. The beautiful Cowlitz River will greet you on the right shortly after you turn into the neighborhood and on a clear day views of towering Butter Peak can be had as you pull into the cabin drive. Heartwood includes a cedar hot tub, large kitchen, WiFi, 2 bathrooms, a full laundry room, and more. We're located 10 mins from town and 30 mins from White Pass....",
    price:249,
  },
  {
    
    ownerId: 8,
    address:"123 Disney Lane",
    city:"Nourth Bend",
    state:"Washington",
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"iny House With Mountain View Stay",
    description:"Dreamy king bed, incredible view of Mount Si, soothing lighting, large TV, super close to food, grocery, premium outlets etc, hikes nearby, convertible couch-to-bed downstairs...",
    price:290,
  },
  {
    
    ownerId: 9,
    address:"123 Disney Lane",
    city:"Sooke",
    state:"British Columbia",
    country:"Canada",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Owl’s Perch Treehouse Unique Treetop Escape",
    description:"Nestled between large cedars and a giant maple, Owl’s Perch offers stunning views across the Salish Sea to the mountains of Washington state. This one of kind treehouse reaches 30 feet off the ground and has a full bathroom and kitchenette. The large deck is perfectly situated in the trees canopy and provides maximum privacy. Located along the Galloping goose trail only 5 minutes from Sooke city center and the Sooke Potholes. Owl’s Perch is the perfect place to stay for your island adventure",
    price:182,
  },
  {
    
    ownerId: 10,
    address:"123 Disney Lane",
    city:"Monroe",
    state:"Utah",
    country:"United States",
    lat:37.7645358,
    lng:-122.4730327,
    name:"Cobblestone Ranch Cabin",
    description:"This charming little cabin is located at the base of Monroe Mountain. It has spectacular views of mountains in all directions from the loft deck. It sleeps 5 guests comfortably.  It is a darling and cozy little home base for Utah's Mighty 5 National Parks, or to relax and enjoy Monroe Mountain, Hot Springs, ATV trails, fishing, hiking, and wildlife all nearby. In summer months, enjoy watching the para-gliders/hang-gliders land just across the street. We will consider requests for 1 night stays...",
    price:167,
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
