const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { isValidURL } = require("../../src/utils/values");

module.exports = async function (url) {
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
