const fetch = require("node-fetch");
const cheerio = require("cheerio");

let base = "https://m.gsmarena.com/";

/**
 * gsmarena Search
 * @param {String} q yang mau di cari / query
 * @returns object
 */
module.exports = async function (q) {
	let search = base + `results.php3?sQuickSearch=yes&sName=${encodeURIComponent(q)}`;
	let res = await fetch(search);
	let html = await res.text();
	let $ = cheerio.load(html);

	let hasil = [];

	$("div.general-menu > ul > li").each(function () {
		let judul = $(this).find("strong").text();
		let thumb = $(this).find("img").attr("src");
		let link = $(this).find("a").attr("href");
		link = base + link;
		hasil.push({ judul, thumb, link });
	});
	if (!hasil.length) {
		// throw new Error("Not found");
		return false;
	}
	return hasil;
};
