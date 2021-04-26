const express = require('express');
const app = express();



let server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listen on port ' + server.address().port);
});