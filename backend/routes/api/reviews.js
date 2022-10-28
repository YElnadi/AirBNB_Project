const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User, Review, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
        return;
    }
    const reviewAddedImg = await ReviewImage.create({
        url,
        reviewId: req.params.reviewId
    })
    if (reviewAddedImg.id >= 10) {
        res.status(403)
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
        return
    }
    console.log('reviewaddedimg:', reviewAddedImg)
    res.json({ id: reviewAddedImg.id, url })




})


//Get all Reviews of the Current User
router.get('/current', async (req, res) => {
    const Reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                include: [{
                    model: SpotImage,
                    as: 'SpotImages',
                    where: {
                        preview: true
                    },
                    attributes: []

                }],
                attributes: {
                    include:
                        [
                            //                 [
                            //             sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'
                            //         ],
                            //     ]
                            // }
                            [sequelize.literal('(SELECT MAX("SpotImages".url) from "SpotImages" where "SpotImages"."spotId"="Spot".id)'), 'previewImage']
                        ],
                        exclude:["createdAt","updatedAt"]

                },
            },

            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },

        ],

    })
    res.json({ Reviews })

})


//edit a review 
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body
    const Reviews = await Review.findByPk(req.params.reviewId)
    if (!Reviews) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
        return;
    }
    if (review !== undefined) {
        Reviews.review = review
    }
    if (stars !== undefined) {
        Reviews.stars = stars
    }
    await Reviews.save()
    res.json(Reviews)
})



//delete a review 
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    })
    console.log('review:',review)

    if (!review) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
        return;
    }

    await review.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})













module.exports = router;