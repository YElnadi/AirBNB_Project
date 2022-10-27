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
    if(reviewAddedImg.id >= 10){
        res.status(403)
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
          return
    }
    console.log('reviewaddedimg:', reviewAddedImg)
    res.json({ id:reviewAddedImg.id, url})


    

})





















module.exports = router;