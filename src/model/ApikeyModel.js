const PemalasDB = require("../config/db");

/**
 * Find Apikey In Model
 * @param {String} apikey apikey client
 * @returns object
 */
exports.findApikey = async function (apikey) {
	let cek = await PemalasDB.findOne({ apikey });
	return cek;
};

/**
 * update limit apikey
 * @param {String} apikey apikey client
 * @param {Number} to jumlah yang telah dikurang
 */
exports.updateLimit = async function (apikey, to) {
	PemalasDB.findOneAndUpdate({ apikey }, { $set: { limit: to } })
};
