const express = require('express');
const router = express.Router();
const userAuthCtrl = require('../controllers/Userauth');
const auth = require('../middlewares/auth');

router.post('/signup', userAuthCtrl.signup);
router.post('/login', userAuthCtrl.login);
router.get('/logout', auth, userAuthCtrl.logout);

module.exports = router;