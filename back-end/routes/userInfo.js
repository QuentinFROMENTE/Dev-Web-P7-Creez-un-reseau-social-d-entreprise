const express = require('express');
const router = express.Router();
const userInfoCtrl = require('../controllers/UserInfo');
const Auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/thread', Auth, userInfoCtrl.getUserThread);
router.post('/profile', Auth, userInfoCtrl.getProfile);
router.put('/update', Auth, multer, userInfoCtrl.updateProfile);

module.exports = router;