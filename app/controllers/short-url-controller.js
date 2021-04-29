const { ShortUrl } = require('../models');

exports.createShortUrl = async (req, res) => {
    let {url, ex} = req.query;

    if (!ex) {
        ex = new Date();
        ex.setMonth(ex.getMonth() + 3);
    }

    const urlId = await generateAndValidateShortUrl();

    await ShortUrl.create({
        originalUrl: url,
        urlId,
        expirationDate: ex
    });

    return res.json({newUrl: `${req.get('host')}/${urlId}`});
};

const generateAndValidateShortUrl = async () => {
    const urlId = Math.random().toString(36).substring(7);
    const shortUrl = await ShortUrl.findOne({where: {urlId}});
    if (shortUrl) {
        return generateAndValidateShortUrl();
    }

    return urlId;
};

exports.redirectUrl = async (req, res) => {
    const urlId = req.params.urlId;

    const shortUrl = await ShortUrl.findOne({where: {urlId}});

    if (!shortUrl) {
        return res.send("There's not urls");
    }

    res.redirect(shortUrl.originalUrl);
};