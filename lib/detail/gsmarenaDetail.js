const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async function (url) {
	function isValidURL(string) {
		var res = string.match(
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
		);
		return res !== null;
	}
	if (isValidURL(url) != true) {
		// throw new Error("Query not url")
		return false;
	}
	let res = await fetch(url);
	let html = await res.text();
	let $ = cheerio.load(html);

	let title = $("title").text();
	let image = $("div.specs-cp-pic-rating > a > img").attr("src");
	let desks = [];

	// let desk = $("div#specs-list").each(function () {
	// 	let t = $(this);
	//     // desks.push(t)
	// });
	let desk = $("div#specs-list > table").text();
	desk = desk.trim();
	return { title, image, desk };
};
