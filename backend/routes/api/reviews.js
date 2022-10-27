const express = require('express')
const router = express.Router();
const { Spot, SpotImage, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




//Add an Image to a Review based on the Review's id
// router.post('/:reviewId/images',requireAuth, async(req, res)=>{
//     const{url} = req.body
//     const reviewId = await Review.findOne(req.)
// })





















module.exports = router;