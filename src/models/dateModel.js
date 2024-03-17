import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
  date: {
    type: String,
    require: [true, 'Please enter Date'],
    unique: [true, 'Date already Exists'],
  },
  users: {
    type: Array,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Date = mongoose.models.date || mongoose.model('date', dateSchema);

export default Date;
