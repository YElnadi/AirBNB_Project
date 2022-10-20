const router = require('express').Router();
module.exports = router;
const { restoreUser } = require("../../utils/auth.js");


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });



//test user auth middlewares
// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });


// GET /api/restore-user
router.use(restoreUser);
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

//test requireAuth
// router.use(restoreUser);

// // ...

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );





router.use(restoreUser);

module.exports = router;