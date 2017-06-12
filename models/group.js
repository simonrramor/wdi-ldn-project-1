const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: { type: String, required: true }
});

groupSchema.methods.belongsTo = function BelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};




module.exports = mongoose.model('photo', groupSchema);
