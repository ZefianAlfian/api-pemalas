const monk = require("monk");
const url =
  "mongodb+srv://pemalasapi:pemalasapi7387@cluster0.mn1td.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db = monk(url);

db.then(() => {
  console.log("Connected correctly to server");
});

const PemalasDB = db.get("pemalasapi");

module.exports = PemalasDB;