const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  resolvedAddresses: [{type: String}],
  signatures: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('entity', EntitySchema);
