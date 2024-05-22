import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      login: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      cover: {
         type: String,
         default: '',
      },
      avatar: {
         type: String,
         default: '',
      },
      likes: {
         type: Array,
         default: [],
      },
      admin: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
)

export default mongoose.model('users', userSchema)
