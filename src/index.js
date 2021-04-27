const Palettizer = require(__dirname + '/palettizer');
const Logger = require(__dirname + '/logger');

const palettizer = new Palettizer({}, new Logger({ name: "Palettizer"}));
palettizer.listen(process.env.APP_PORT);