const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  caption: String,
  image: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group', required: true }],
  date: String
}, {
  timestamps: true
});

photoSchema
.virtual('imageSRC')
.get(function getImageSRC() {
  if(!this.image) return null;
  if(this.image.match(/^http/)) return this.image;
  return `https://s3-eu-west-1.amazonaws.com/wdi-27-london-new/${this.image}`;
});

photoSchema.methods.belongsTo = function photoBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};




module.exports = mongoose.model('Photo', photoSchema);
