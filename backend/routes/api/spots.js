const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User,Booking, Review,ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const user = require('../../db/models/user');



const validateSpotData = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors

]

const validateReview =[
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

//get all spots 
router.get('/', async (req, res) => {
    let { page, size } = req.query;

    page = parseInt(page);
    size = parseInt(size);
  
    if (Number.isNaN(page)) page = 1;
    if (Number.isNaN(size)) size = 20;

    const spots = await Spot.findAll({
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
        },
        {
            model: SpotImage,
            as: 'SpotImages',
            // where: {
            //     preview: true
            // },
            attributes: []
        }
        ],
        attributes: {
            include:
                [
                    [sequelize.literal('(SELECT avg("Reviews".stars) from "Reviews" where "Reviews"."spotId"="Spot".id)'), 'avgRating'],

                    [sequelize.literal('(SELECT MAX("SpotImages".url) from "SpotImages" where "SpotImages"."spotId"="Spot".id)'), 'previewImage'],
                ]

        },
        group: ['Spot.id'],
        limit: size,
        offset: size * (page - 1),


    })
    //console.log("spots",spots)
    res.json({ spots, page, size })
})


//create a spot 
router.post('/', validateSpotData, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const ownerId = req.user.id;
    const newSpot = await Spot.create({
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
    })
    res.status(201)
    res.json(newSpot)
})

//add an image to a spot based on spot id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body

    //console.log('req:',req)
    //const {spotId} = req.params.spotId
    //console.log('spotId:',req.params.spotId)
    const spotId = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })
    if (!spotId) {
        res.status(400)
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
        return;
        }        

    const newSpotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
    })
    res.json({ id: newSpotImage.id, url, preview })


})

//get spots of current user 
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        // include: [
        //     {
        //         model: SpotImage,
        //         as: 'SpotImages',
        //         where: {
        //             preview: true
        //         },
        //         attributes: [],
        //         required: false
        //     },
        //     {
        //     model: Review,
        //     as: 'Reviews',
        //     attributes: [],
        // },
        // ],
        attributes: {
            include:
                [
                    [sequelize.literal('(SELECT avg(reviews.stars) from "Reviews" reviews where reviews."spotId"="Spot".id)'), 'avgRating'],

                    [sequelize.literal('(SELECT MAX(spotimages.url) from "SpotImages" spotimages  where spotimages."spotId"="Spot".id)'), 'previewImage'],

                    // [
                    //     sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                    // ],
                    // [
                    //     sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'
                    // ],
                ]


        },
        group: ['Spot.id']


    })

    res.json({ spots })
})


//get details for a spot from spot id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
        return;
    }        
    const details = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include:[
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }

        ]

    })
    res.json(details)

})

//edit a spot
router.put('/:spotId', requireAuth, validateSpotData, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)

    if (spot) {
        if (address !== undefined) {
            spot.address = address
        }
        if (city !== undefined) {
            spot.city = city
        }
        if (state !== undefined) {
            spot.state = state
        }
        if (country !== undefined) {
            spot.country = country
        }
        if (lat !== undefined) {
            spot.lat = lat
        }
        if (lng !== undefined) {
            spot.lng = lng
        }
        if (name !== undefined) {
            spot.name = name
        }
        if (description !== undefined) {
            spot.description = description
        }
        if (price !== undefined) {
            spot.price = price
        }
        await spot.save()
        res.json(spot)
    }

    else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})

//create a review for a spot based on  spot id
router.post('/:spotId/reviews',requireAuth,validateReview, async(req,res)=>{
    const {review, stars} = req.body
    const userId = req.user.id
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })    
    if(!spot){
        
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
        return;
    }
    const existingSpotReview =  await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })
    if (existingSpotReview) {
        res.status(403)
        res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
          })
        return;
    }

        
    const newReview = await Review.create({
        review,
        stars,
        spotId:req.params.spotId,
        userId
    })
    //console.log('review:', newReview)
    res.status(201)
    res.json(newReview)

    
})



//Get all Reviews by a Spot's id
router.get('/:spotId/reviews',requireAuth, async (req, res)=>{
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
          return;
    }
    const Reviews = await Review.findAll({
        where:
        {
            spotId:spot.id
        },
            include:[
            {
                model:User,
                attributes:['id','firstName','lastName']
            },
            {
                model:ReviewImage,
                attributes:['id','url']
            },
        ],
        
    })
    res.json({Reviews})

})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async(req,res)=>{
    const{startDate, endDate} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    console.log("spot:", spot)

    if(!spot){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
          return
    }
    const bookings = await Booking.findAll({
        where:{
            spotId:req.params.spotId
        },
        attributes:['startDate','endDate']
    })

    const userStartDate = new Date (startDate)
    const userEndDate = new Date (endDate)

    var hasConflict = false;
    // Object.keys(obj).forEach(function(key) {
    //     console.log(obj[key]);
    bookings.forEach(booking =>  {
        if(checkDateIntersect(booking.startDate, booking.endDate, userStartDate, userEndDate)){

          hasConflict = true;
          return;           
        }
    })

    if (hasConflict){
        res.status(403)
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          }) 
          return;
    }

    if(endDate <= startDate ){
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
          return;
    }

    const newBooking = await Booking.create({
        spotId:spot.id,
        userId:req.user.id,
        startDate,
        endDate,
    })
    res.json(newBooking)

     //date enterted by user 
    //  const userStartDate = new Date (startDate)
    //  const getUserStartDate = userStartDate.getTime()
    //  console.log("user input date:", getUserStartDate)

    //  //date from booking table
    //  const date2 = date[0].startDate
    //  //console.log("date2:",date2)
    //  const starDateTable = new Date(date2)
    //  const starDateBooking = starDateTable.getTime()
    //  console.log('starDateBooking:', starDateBooking)

    // if(getUserStartDate === starDateBooking){
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // }

    
    // if(endDate === endate || startDate === startDate.in(Model.Booking).value){
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // } 

    /////////////////////////////////////
    // console.log("startdate:", startDate)
    // const checkDate = await Booking.findAll({
    //     where:{
    //        // "fieldOfYourDate" : {[Op.between] : [startedDate , endDate ]
    //        [Op.and]:{
    //            [Op.gte]:startDate,
    //            [Op.lte]:endDate
    //        }
    //     }
    // })
    // console.log("checkDate:", checkDate)
    //////////////////////////////////////////
    // if(checkDate.length !== 0){
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // }
    // const checkDate = await Booking.findOne({
    //     where:{
    //         [Op.and]: [
    //             {[Op.overlap]:startDate},
    //             {[Op.overlap]:endDate}
    //           ]
    //     }
    // })
    // if(checkDate !== null){
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // }
    //console.log("startedDate:", startedDate.getTime())

    // if(starDateBooking === getStartDate){
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // }

    // console.log("date:",date)
    // console.log("startdate:", date[0].startDate)


    //res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })

//     const endedDate = new Date (endDate)
//     const getEndDate = endedDate.getTime()
//     console.log("endedDate:", endedDate.getTime())

//     console.log('newBooking:', newBooking)
//     console.log('bookingStartdate:',newBooking.startDate)

//     const bookingStratedDate =newBooking.startDate.getTime()
//     console.log('bookingStartDate:',bookingStratedDate)

//     const bookingEndedDate =newBooking.endDate.getTime()
//     console.log('bookingEndedDate:',bookingEndedDate)

//     if(bookingStratedDate === getStartdate || bookingEndedDate === getEndDate){
//         res.status(403)
//         res.json({
//             "message": "Sorry, this spot is already booked for the specified dates",
//             "statusCode": 403,
//             "errors": {
//               "startDate": "Start date conflicts with an existing booking",
//               "endDate": "End date conflicts with an existing booking"
//             }
//     })
// }
    // const newBooking = await Booking.create({
    //     spotId:spot.id,
    //     userId:req.user.id,
    //     startDate,
    //     endDate,
    // })
    //res.json(newBooking)

    
})

checkDateIntersect = function(start1, end1, start2, end2){
    return start1 < end2 && start2 < end1;
}




//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async(req,res)=>{
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
          return;
    }

    if(spot.ownerId === req.user.id){
        const Bookings = await Booking.findAll({
            where:{
                spotId:spot.id,   
            },
            include:[
                    {
                        model:User,
                        attributes:['id', 'firstName', 'lastName']
                    }
                ]

        })
        res.json({Bookings})
    } else {
        const Bookings = await Booking.findAll({
            where:{
                spotId:spot.id,   
            },
            attributes:['id','startDate','endDate']
        })
        res.json({Bookings})
    }
    

    // if(User.id!==req.user.id){
    //     const Bookings = await Booking.findAll({
    //     where:{
    //         // userId:
    //         //     {[Op.ne]:req.user.id } 
    //         // ,
    //         spotId:spot.id
    //     },
    //     attributes:['spotId','endDate','startDate']
        
    // })
    // return res.json({Bookings})
    // }
    // const allBookings = await Booking.findAll({
    //     where:{
    //         userId:req.user.id,
    //         spotId:spot.id
    //     },
    //     include:[
    //         {
    //             model:User,
    //             attributes:['id', 'firstName', 'lastName']
    //         }
    //     ], 
    // })
    // res.json({allBookings}) 
    

    
})
//delete a spot

router.delete('/:spotId',requireAuth, async(req, res)=> {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!spot) {
        
            res.status(400)
            res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        
        return;
    }

    const userId = req.user.id;
    if (spot.ownerId !== userId){
        res.status(403)
        res.json(
            {
                "message": "User does not own the corresponding spot",
                "statusCode": 403
            }
        )
        return;
    }

    await spot.destroy()
    res.status(200)
    res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
          }
    )
})

//Add Query Filters to Get All Spots



module.exports = router;