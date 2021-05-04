const app = require('./app');
const { sequelize } = require('./app/models');

let server = app.listen(process.env.PORT || 3000, async () => {
    console.log('Listen on port ' + server.address().port);
    await sequelize.authenticate();
    console.log('database ready');
});