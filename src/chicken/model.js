import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  coop: { type: Schema.Types.ObjectId, ref: 'Coop' },
});

schema.pre('findOne', function (next) {
  this.populate('coop');
  next();
});

export default mongoose.model('Chicken', schema);