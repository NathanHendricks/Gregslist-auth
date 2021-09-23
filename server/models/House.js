import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {
    bedrooms: {
      type: Number,
      required: [true, 'How many bedrooms?']
    },
    bathrooms: {
      type: Number,
      required: [true, 'Where are the bathrooms?']
    },
    levels: {
      type: Number,
      required: [true, 'How Many levels?']
    },
    img: { type: String },
    year: {
      type: Number,
      min: 1100,
      required: [true, 'When was it built?']
    },
    price: {
      type: Number,
      required: [true, 'How much for this beautiful place?']
    },
    description: {
      type: String,
      requird: [true, 'What should i know about it?']
    },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
