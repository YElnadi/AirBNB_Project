const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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

//get all spots 
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        // include: [{
        //     model: Review,
        //     as: 'Reviews',
        //     attributes: [],
        // },
        // {
        //     model: SpotImage,
        //     as: 'SpotImages',
        //     where: {
        //         preview: true
        //     },
        //     attributes: []
        // }
        // ],
        attributes: {
            include:
                [
                    //         [
                    //             sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                    //         ],
                    //         [
                    //             sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'
                    //         ],

                    [sequelize.literal('(SELECT avg(Reviews.stars) from Reviews where Reviews.spotId=Spot.id)'), 'avgRating'],

                    [sequelize.literal('(SELECT MAX(SpotImages.url) from SpotImages where SpotImages.spotId=Spot.id)'), 'previewImage'],
                ]

        },
        group: ['Spot.id']

    })
    //console.log("spots",spots)
    res.json({ spots })
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
    if (spotId) {
        const newSpotImage = await SpotImage.create({
            spotId: req.params.spotId,
            url,
            preview,
        })
        res.json({ id: spotId.id, url, preview })
    }
    else {
        res.status(400)
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }


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
                    [sequelize.literal('(SELECT avg(Reviews.stars) from Reviews where Reviews.spotId=Spot.id)'), 'avgRating'],

                    [sequelize.literal('(SELECT MAX(SpotImages.url) from SpotImages where SpotImages.spotId=Spot.id)'), 'previewImage'],

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
    const spotId = await Spot.findByPk(req.params.spotId)
    if (spotId) {
        const details = await Spot.findOne({
            where: {
                id: req.params.spotId
            },
            include: [
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
    } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

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












module.exports = router;