import mongoose from "mongoose";

const errorLog = new mongoose.Schema({
  code: {
    type: String,
    require: true,
    min: 1,
    max: 3,
  },
  detail: {
    type: String,
    require: true,
    min: 5,
    max: 50,
  },
  status: {
    type: String,
    require: true,
    min: 3,
    max: 3,
  },
  source: {
    type: Object,
    require: true,
    min: 1,
    max: 2,
  },
  title: {
    type: String,
    require: true,
    min: 3,
    max: 30,
  },
  type: {
    type: String,
    require: true,
    min: 3,
  },
  ip: {
    type: String,
    require: true,
    min: 7,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("errorLogs", errorLog);
