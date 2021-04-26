const PemalasDB = require("../config/db");

exports.findApikey = async function(apikey){
    let cek = await PemalasDB.findOne({apikey});
    return cek;
}