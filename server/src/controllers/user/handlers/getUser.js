import jwt from 'jsonwebtoken'

import User from '../../../models/User.js'
import Album from '../../../models/Album.js'
import Track from '../../../models/Track.js'

const getUser = async (req, res) => {
   try {
      const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
      const { login } = req.params

      const user = await User.findOne({ login })

      if (!user) {
         return res.status(404).json({
            msg: 'Пользователь не найден',
         })
      }

      const albums = await Album.find({ 
         artists: { $in: user._id },
         published: true, 
      })
         .sort({ createdAt: -1 })
         .populate({ path: 'artists', select: 'name login' })

      const tracks = await Track.find({ 
         artists: { $in: user._id },
         published: true,
      })
         .sort({ createdAt: -1 })
         .populate({ path: 'album', select: 'cover' })
         .populate({ path: 'artists', select: 'name login avatar' })

      if (!token) {
         return res.status(200).json({
            msg: 'Пользователь найден',
            user: {
               _id: user._id,
               login: user.login,
               name: user.name,
               avatar: user.avatar,
               cover: user.cover,
               likes: user.likes.length,
               like: undefined,
               loading: false,
            },
            albums: albums.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               artists: obj.artists,
               cover: obj.cover,
            })),
            tracks: tracks.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               album: obj.album,
               like: undefined,
               loading: false,
            }))
         })
      }

      const decodedToken = jwt.verify(token, 'ryan_gosling_1337')
      const userFind = await User.findOne({ _id: decodedToken })

      if (!userFind) {
         return res.status(200).json({
            msg: 'Пользователь найден',
            user: {
               _id: user._id,
               login: user.login,
               name: user.name,
               avatar: user.avatar,
               cover: user.cover,
               likes: user.likes.length,
               like: undefined,
               loading: false,
            },
            albums: albums.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               artists: obj.artists,
               cover: obj.cover,
            })),
            tracks: tracks.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               album: obj.album,
               like: undefined,
               loading: false,
            }))
         })
      } else {
         return res.status(200).json({
            msg: 'Пользователь найден',
            user: {
               _id: user._id,
               login: user.login,
               name: user.name,
               avatar: user.avatar,
               cover: user.cover,
               likes: user.likes.length,
               like: user.likes.includes(userFind._id),
            },
            albums: albums.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               artists: obj.artists,
               cover: obj.cover,
            })),
            tracks: tracks.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               album: obj.album,
               like: obj.likes.includes(userFind._id),
               loading: false,
            }))
         })
      }
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getUser
