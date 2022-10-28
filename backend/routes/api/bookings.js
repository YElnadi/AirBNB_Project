const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const user = require('../../db/models/user');


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }, include: [{
                    model: SpotImage,
                    attributes: []
                }],
                attributes: {
                    include: [
                        [sequelize.literal('(SELECT MAX("SpotImages".url) from "SpotImages" where "SpotImages"."spotId"="Spot".id)'), 'previewImage']
                    ]
                },
                group: ['Spot.id']
            }

        ],
    })

    res.json({ bookings })
})


//edit a booking 
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body

    const userStartDate = new Date(startDate)
    const userEndDate = new Date(endDate)

    //if endDate comes before startDate
    if (userEndDate <= userStartDate) {
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

    const bookings = await Booking.findByPk(req.params.bookingId)
    if (!bookings) {
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
        return;
    }
    
    const bookingList = await Booking.findAll({
        where: {
            id: req.params.bookingId
        },
        attributes: ['startDate', 'endDate']
    })
    //console.log('bookingList:',bookingList)

    bookingList.forEach(bookings => {
        if (checkDateIntersect(bookings.startDate, bookings.endDate, userStartDate, userEndDate)) {
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
    })

        if (startDate !== undefined) {
            bookings.startDate = startDate
        }

        if (endDate !== undefined) {
            bookings.endDate = endDate
        }
        await bookings.save()
        res.json(bookings)

    checkDateIntersect = function (start1, end1, start2, end2) {
        return start1 < end2 && start2 < end1;
    }
})



//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    })

    if (!booking) {
        res.status(404)
        res.json({
            "message": "booking couldn't be found",
            "statusCode": 404
        })
        return;
    }

    const userId = req.user.id;
    if (booking.userId !== userId){
        res.status(403)
        res.json(
            {
                "message": "User does not own the corresponding booking",
                "statusCode": 403
            }
        )
        return;
    }

    await booking.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})











module.exports = router;