// backend/routes/api/users.js

//hold the resources for the route paths beginning with /api/users
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const router = express.Router();



//sign up
//POST /api/users
//signup validation in order to create a user account we need email username and password 
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    //.exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    //.exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .not()
    .withMessage('First name is required'),
    check('lastName')
    .exists({ checkFalsy: true })
    .not()
    .withMessage('Last name is required'),
  handleValidationErrors
];

//signup a user 
router.post(  //api/users
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    if (email !== null) {
      const checkEmailExist = await User.findOne({
        where: {
          email: email
        }
      })
      if (checkEmailExist) {
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }
    }
    else {
      res.json(
        {
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "email": "Invalid email",
          }
        }
      )
    }
    if (username !== null) {
      const checkUserName = await User.findOne({
        where: {
          username: username
        }
      })
      if (checkUserName) {
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
      }                        
    }
    const user = await User.signup({ email, username, password, firstName, lastName });
    var token = await setTokenCookie(res, user);
    let retuser = user.toJSON();
    retuser.token = token;
    return res.json(
      {"user":retuser}
    );
  }

);




















module.exports = router;