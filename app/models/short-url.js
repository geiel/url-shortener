'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShortUrl extends Model {};

  ShortUrl.init({
    originalUrl: DataTypes.STRING,
    urlId: DataTypes.STRING,
    expirationDate: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'short_url',
    modelName: 'ShortUrl',
  });
  return ShortUrl;
};