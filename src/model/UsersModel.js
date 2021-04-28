const PemalasDB = require("../config/db");

/**
 * cek User
 * @param {Object} data data user
 * @returns object
 */
exports.cekUser = async function (data) {
  let { email, username, nomor_whatsapp, telegram, password } = data;
  let hasil = await PemalasDB.findOne({
    email,
    nomor_whatsapp,
  });
  return hasil;
};

/**
 * cek User Login
 * @param {Object} data data user
 * @returns object
 */
exports.cekUserLogin = async function (data) {
  let { email } = data;
  email = email.toLowerCase();
  let hasil = await PemalasDB.findOne({ email });
  return hasil;
};

/**
 * menambah user ke database
 * @param {Object} data data user
 */
exports.tambahUser = async function (data) {
  PemalasDB.insert(data);
};

/**
 * Total user
 * @returns total user
 */
exports.totalUser = async function () {
  let total = await PemalasDB.find({});
  return total.length;
};
