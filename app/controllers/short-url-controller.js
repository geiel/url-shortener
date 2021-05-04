const { ShortUrl } = require('../models');

exports.createShortUrl = async (req, res) => {
    let {url, ex} = req.body;
    console.log(url);

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

exports.redirectUrl = async (req, res, next) => {
    const urlId = req.params.urlId;
    const shortUrl = await ShortUrl.findOne({where: {urlId}});

    if (!shortUrl) {
        return res.send("There's not urls");
    }

    res.redirect(shortUrl.originalUrl);
};

exports.getAllUrls = async (req, res) => {

    const shortUrls = await ShortUrl.findAll({raw: true});
    const baseUrl = req.get('host');
    let allUrls = [];
    if (shortUrls) {
        allUrls = shortUrls.map(({id, createdAt, updatedAt, ...rest}) => rest);
        allUrls.map(url => url.urlId = `${baseUrl}/${url.urlId}`);
    }
    return res.json(allUrls);
}