import qs from 'qs'
import jwt from 'jsonwebtoken'

import Track from '../../../models/Track.js'
import User from '../../../models/User.js'

const getTracks = async (req, res) => {
   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
   const query = qs.parse(req._parsedUrl.query)

   try {
      const tracks = await Track.find({
         name: new RegExp(query?.search, 'i'),
         published: true,
      })
         .sort({ createdAt: -1 })
         .skip(query.page * 30)
         .limit(30)
         .populate({ path: 'album', select: 'cover' })
         .populate({ path: 'artists', select: 'name login avatar' })

      if (!token) {
         return res.status(200).json({
            msg: 'ок',
            items: tracks.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               album: obj.album,
               duration: obj.duration,
               like: undefined,
               loading: false,
            })),
         })
      }

      const decodedToken = jwt.verify(token, 'ryan_gosling_1337')
      const user = await User.findOne({ _id: decodedToken })

      if (!user) {
         return res.status(200).json({
            msg: 'ок',
            items: tracks.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               album: obj.album,
               like: undefined,
            })),
         })
      } else {
         return res.status(200).json({
            msg: 'ок',
            items: tracks.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               album: obj.album,
               like: obj.likes.includes(user._id),
            })),
         })
      }


   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getTracks
