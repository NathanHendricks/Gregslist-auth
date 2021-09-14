import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    hours: { type: Number, required: true },
    rate: { type: Number, required: true },
    description: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

JobSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
