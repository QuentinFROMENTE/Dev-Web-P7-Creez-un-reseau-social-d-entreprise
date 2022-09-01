const express = require('express');
const router = express.Router();
const quoteCtrl = require('../controllers/quote');
const auth = require('../middlewares/auth');

router.get('/', quoteCtrl.getAll);
router.post('/', auth, quoteCtrl.createNewQuote);
router.put('/:id', auth, quoteCtrl.updateOne);
router.delete('/:id', auth, quoteCtrl.deleteOne);
router.put('/like/:id', auth, quoteCtrl.likeOne);

module.exports = router;