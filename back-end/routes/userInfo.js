const express = require('express');
const router = express.Router();
const userInfoCtrl = require('../controllers/UserInfo');
const Auth = require('../middlewares/auth');

router.post('/:id', Auth, userInfoCtrl.getProfile);
router.post('/profile', userInfoCtrl.createProfile);
router.put('/update', Auth, userInfoCtrl.updateProfile);

module.exports = router;