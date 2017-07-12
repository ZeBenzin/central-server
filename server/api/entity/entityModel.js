const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  resolvedAddresses: [String],
  signatures: [Number]
});

module.exports = mongoose.model('entity', EntitySchema);
