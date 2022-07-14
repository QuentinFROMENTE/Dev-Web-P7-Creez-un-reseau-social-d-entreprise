const express = require('express');
const router = express.Router();
const userInfoCtrl = require('../controllers/UserInfo');
const Auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/thread', Auth, userInfoCtrl.getUserThread);
router.get('/:id', Auth, userInfoCtrl.getProfile);
router.post('/profile', multer, userInfoCtrl.createProfile);
router.put('/update', Auth, multer, userInfoCtrl.updateProfile);

module.exports = router;