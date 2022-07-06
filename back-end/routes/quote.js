const express = require('express');
const router = express.Router();
const quoteCtrl = require('../controllers/quote');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', auth, quoteCtrl.getAll);
router.post('/', auth, multer, quoteCtrl.createNewQuote);
router.put('/:id', auth, multer, quoteCtrl.updateOne);
router.delete('/:id', auth, quoteCtrl.deleteOne);
router.put('/:id/like', auth, quoteCtrl.likeOne);

module.exports = router;