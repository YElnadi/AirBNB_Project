//session router
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
      //.exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];
  
//POST /api/session
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) 
        {
          res.status(401)
          res.json(
              {
                  "message": "Invalid credentials",
                  "statusCode": 401
              }
          )
          return
      }

      const token = await setTokenCookie(res, user);
      let retuser = user.toJSON()
      retuser.token = token
      return res.json(
        {"user":retuser}
      );
    }
  );

// Log out
//DELETE /api/session logout route will remove the token cookie from the response and return a JSON success message.
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;

      if (user){
        return res.json({
          "user":user.toSafeObject()
        })
      } else {
        return res.json({"user":null});
      }
    });


  

  

module.exports = router;