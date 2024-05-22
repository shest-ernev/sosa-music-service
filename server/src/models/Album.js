import mongoose from 'mongoose'

const albumShema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'users',
      },
      name: {
         type: String,
         required: true,
      },
      cover: {
         type: String,
         required: true,
      },
      genres: {
         type: Array,
         default: [],
      },
      artists: [
         {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'users',
         },
      ],
      year: {
         type: Number,
         required: true,
      },
      published: {
         type: Boolean,
         default: false,
      },
      likes: [
         {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'users',
         },
      ],
   },
   { timestamps: true }
)

export default mongoose.model('albums', albumShema)
