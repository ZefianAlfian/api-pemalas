const PemalasDB = require("../config/db");

exports.cekUser = async function (data) {
  let { email, username, nomor_whatsapp, password } = data;
  let hasil = await PemalasDB.findOne({
    email,
    nomor_whatsapp,
  });
  return hasil;
};

exports.tambahUser = async function (data) {
  PemalasDB.insert(data);
};

exports.totalUser = async function () {
  let total = await PemalasDB.find({});
  return total.length;
};
