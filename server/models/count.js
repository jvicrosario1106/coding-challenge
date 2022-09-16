const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countSchema = Schema({
  number: {
    type: Number,
    default: 0,
  },
});

const Count = mongoose.model("Count", countSchema);

module.exports = Count;
