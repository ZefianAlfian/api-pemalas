const fetch = require("node-fetch");
const cheerio = require("cheerio");
const FormData = require("form-data");

module.exports = async function (q) {
  let form = new FormData();
  form.append("query", q);
  form.append("cek", "cek");
  let res = await fetch("https://tools.darkclownsecurity.id/playstore", {
    method: "POST",
    headers: {
      cookie: "__cfduid=dfcdd16ef21b6d9d602b9b07ade2b97bf1619485230",
      origin: "https://tools.darkclownsecurity.id",
      referer: "https://tools.darkclownsecurity.id/playstore",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
  let html = await res.text();
  let $ = cheerio.load(html);
  let tam = [];
  let arrApp = [];
  let arrPs = [];
  let arrRate = [];
  let arrHarga = [];
  let arrDev = [];
  let arrDesk = [];
  let arrTitle = [];
  let result = [];
  $(".h-100").each(function () {
    let title = $(this).find("h5.card-title > label").text();
    arrTitle.push(title);
    $(this)
      .find("p.card-text > label")
      .each(function (er) {
        let str = $(this).text();
        tam.push(str);
      });
  });

  for (i = 0; i < tam.length; i += 6) {
    arrApp.push(tam[i]);
  }

  for (i = 1; i < tam.length; i += 6) {
    arrPs.push(tam[i]);
  }

  for (i = 2; i < tam.length; i += 6) {
    arrDev.push(tam[i]);
  }

  for (i = 3; i < tam.length; i += 6) {
    arrHarga.push(tam[i]);
  }

  for (i = 4; i < tam.length; i += 6) {
    arrRate.push(tam[i]);
  }

  for (i = 5; i < tam.length; i += 6) {
    arrDesk.push(tam[i]);
  }

  for (a = 0; a < arrApp.length; a++) {
    result.push({
      title: arrTitle[a],
      appID: arrApp[a],
      developer: arrDev[a],
      playstore: arrPs[a],
      rate: arrRate[a],
      deskripsi: arrDesk[a],
    });
  }
  return result;
};
