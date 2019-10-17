require('dotenv').config();

const app          = require('./app');
const appointments = require('./appointments');
const pkg          = require('../package.json');

app.set('appointments', appointments);

app.listen(process.env.PORT, process.env.HOST, () => {

  console.log(`${pkg.name}@${pkg.version} `
            + `is running in ${process.env.NODE_ENV} mode `
            + `on ${process.env.HOST}:${process.env.PORT}`);
});
