const { Router } = require('express');
const shortUrlController = require('../controllers/short-url-controller');

const router = Router();
// console.log(shortUrlController);

router.post('/urls', shortUrlController.createShortUrl);
router.get('/:urlId', shortUrlController.redirectUrl);

module.exports = router;