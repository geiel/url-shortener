const { Router } = require('express');
const shortUrlController = require('../controllers/short-url-controller');

const router = Router();

router.post('/urls', shortUrlController.createShortUrl);
router.get('/urls', shortUrlController.getAllUrls);

router.get('/:urlId', shortUrlController.redirectUrl);
module.exports = router;