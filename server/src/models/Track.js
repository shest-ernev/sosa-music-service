import mongoose, { Mongoose } from 'mongoose'

const trackSchema = new mongoose.Schema(
   {
      album: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'albums',
      },
      name: {
         type: String,
         required: true,
      },
      file: {
         type: String,
         required: true,
      },
      artists: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true,
         },
      ],
      duration: {
         type: String,
         required: true,
      },
      likes: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'users',
         },
      ],
      published: {
         required: true,
         type: Boolean,
      }
   },
   { timestamps: true }
)

export default mongoose.model('tracks', trackSchema)
