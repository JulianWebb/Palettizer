const Palettizer = require('./palettizer');
const Logger = require('./logger');


const palettizer = new Palettizer({}, new Logger({ name: "Palettizer"}));
palettizer.listen(process.env.APP_PORT);