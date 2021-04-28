const fetch = require("node-fetch");
const cheerio = require("cheerio");
const FormData = require("form-data");
const path = require("path");
const fs = require("fs");
const { createQuote } = require("./lib/maker/quoteMaker");

(async function () {
  createQuote("tes", "apasi").then((data)=> console.log(data))
})();
