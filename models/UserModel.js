// models/dataModel.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: String,
  value: String,
});

module.exports = mongoose.models.Data || mongoose.model('Data', dataSchema);
