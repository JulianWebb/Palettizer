const Palettizer = require(__dirname + '/palettizer');
const Logger = require(__dirname + '/logger');
const axios = require('axios');

const palettizer = new Palettizer({}, new Logger({ name: "Palettizer"}));
palettizer.listen(process.env.APP_PORT);
console.log(`Listening on ${process.env.APP_PORT}`)

axios.get('http://papermerge:8000/')
    .then(response => {
        console.log(response);
    }).catch(error => {
        console.error(error);
    })