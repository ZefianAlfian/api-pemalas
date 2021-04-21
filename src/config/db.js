const config = require("../config/values");
const monk = require("monk");
const url = config.mongoUrl;
const db = monk(url);

db.then(() => {
  console.log(config.msgSuccesConnect);
});

const PemalasDB = db.get(config.dbGet);

module.exports = PemalasDB;
