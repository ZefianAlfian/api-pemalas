const PemalasDB = require("../config/db");

async function berapaView() {
  let v = await PemalasDB.findOne({ _id: "607bdc01616fe325c421225c" });
  return v;
}

exports.berapaView = async function () {
  let v = await PemalasDB.findOne({ _id: "607bdc01616fe325c421225c" });
  return v;
};
exports.tambahView = async function () {
  let v = await berapaView();
  v = v.counter;
  v = v + 1;
  PemalasDB.findOneAndUpdate(
    { _id: "607bdc01616fe325c421225c" },
    { $set: { counter: v } },
    (err, res) => {
      if (err) return err;
      console.log(res);
    }
  );
};
