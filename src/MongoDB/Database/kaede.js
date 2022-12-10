const { Schema, model } = require("mongoose");

const kaedeSet = new Schema({
    kaedeID: { type: String },

  info: {
    gatewayPing: { type: String, default: "0ms"},
    apiPing: { type: String, default: "0ms"},
    users: { type: String, default: "0"},
    guilds: { type: String, default: "0"}
  }

})

module.exports = model("Kaede-Info", kaedeSet);
