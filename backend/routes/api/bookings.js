const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User,Booking, Review,ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const { Op } = require("Sequelize");
const user = require('../../db/models/user');


//Get all of the Current User's Bookings
router.get('/current',requireAuth, async(req,res)=>{
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include:[
            {
                model:Spot,
                attributes:{
                    exclude:['createdAt','updatedAt']
                },include:[{
                    model:SpotImage,
                    attributes:[]
                }],
                attributes:{
                    include:[
                        [sequelize.literal('(SELECT MAX(SpotImages.url) from SpotImages where SpotImages.spotId=Spot.id)'), 'previewImage']
                    ]
                },
                group:['Spot.id']
            }
            
        ],
    })

    res.json({ bookings })
})
   
















module.exports = router;