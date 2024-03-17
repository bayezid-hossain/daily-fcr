import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    require: [true, 'Who gave this entry?'],
  },
  date: {
    type: String,
    require: [true, 'Please enter Date'],
  },
  farmerName: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  totalDOCInput: {
    type: Number,
    required: [true, 'Please provide total number of DOC'],
  },
  strain: {
    type: String,
    required: [true, 'Please provide a Strain name'],
    default: 'Ross A',
  },
  fcr: {
    type: String,
    required: [true, 'Please provide a Strain name'],
    default: 'Ross A',
  },
  stdFcr: {
    type: String,
    required: [true, 'Please provide a Strain name'],
    default: 'Ross A',
  },
  stdWeight: {
    type: String,
    required: [true, 'Please provide a Strain name'],
    default: 'Ross A',
  },
  avgWeight: {
    type: String,
    required: [true, 'Please provide a Strain name'],
    default: 'Ross A',
  },
  age: {
    type: Number,
    required: [true, 'Please provide total number of DOC'],
    default: 0,
  },
  todayMortality: {
    type: Number,
    required: [true, 'Please provide a mortality number'],
    default: 0,
  },
  totalMortality: {
    type: Number,
    required: [true, 'Please provide a total mortality number'],
    default: 0,
  },
  totalFeed: {
    510: {
      type: Number,
      required: [true, 'Please enter value for Total feed of 510'],
    },
    511: {
      type: Number,
      required: [true, 'Please enter value for Total feed of 511'],
      default: 0,
    },
  },
  farmStock: {
    510: {
      type: Number,
      required: [true, 'Please enter value for Total feed of 510'],
    },
    511: {
      type: Number,
      required: [true, 'Please enter value for Total feed of 511'],
      default: 0,
    },
  },
  disease: {
    type: String,
    default: 'No',
  },
  medicine: {
    type: String,
    default: 'No',
  },
});

const Entry = mongoose.models.entry || mongoose.model('entry', entrySchema);

export default Entry;
