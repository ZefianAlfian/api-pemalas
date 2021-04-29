const fetch = require("node-fetch");

/**
 * 
 * @param {Url} string 
 * @returns boolean
 */
exports.isValidURL = function (string) {
	var res = string.match(
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
	);
	return res !== null;
};

/**
 * get User / Client info
 * @returns information client
 */
exports.getUserInfo = async function () {
	let ip = await fetch("https://api.myip.com/");
	ip = await ip.json();
	return ip;
};

exports.internalError = "Internal server error, please report admin !";

/**
 * generate uuid / apikey
 * @returns uuid / apikey
 */
exports.generateApikey = function () {
	let d = new Date().getTime();

	let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
	});

	return uuid;
};
