const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User, Review, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');




//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)
    console.log('review:', review)
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
                        model:SpotImage,
                        as:'SpotImages',
                        where:{
                            preview: true
                        },
                        attributes:[]
                        
                    }],
                    attributes:{
                        include:
                     [
                    //                 [
                    //             sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'
                    //         ],
                    //     ]
                    // }
                    [sequelize.literal('(SELECT MAX(SpotImages.url) from SpotImages where SpotImages.spotId=Spot.id)'), 'previewImage']
        ]},},
            
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
            
        ],

    })
    res.json({ Reviews })

})




















module.exports = router;