const PemalasDB = require("../config/db");

exports.cekUser = async function (data) {
  let { email, username, nomor_whatsapp, telegram, password } = data;
  let hasil = await PemalasDB.findOne({
    email,
    nomor_whatsapp,
  });
  return hasil;
};

exports.cekUserLogin = async function (data) {
  let { email } = data;
  email = email.toLowerCase();
  let hasil = await PemalasDB.findOne({ email });
  return hasil;
};

exports.tambahUser = async function (data) {
  PemalasDB.insert(data);
};

exports.totalUser = async function () {
  let total = await PemalasDB.find({});
  return total.length;
};
