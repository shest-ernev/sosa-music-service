import jwt from 'jsonwebtoken'

import Album from '../../../models/Album.js'
import Track from '../../../models/Track.js'
import User from '../../../models/User.js'

const getAlbum = async (req, res) => {
   try {
      const { id } = req.params
      const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

      const album = await Album.findOne({
         _id: id,
         published: true,
      }).populate({ path: 'artists', select: 'name login avatar' })

      if (!album) {
         return res.status(404).json({
            msg: 'Такого альбома нет',
         })
      }

      const tracks = await Track.find({ album: id })
         .populate({ path: 'album', select: 'cover' })
         .populate({ path: 'artists', select: 'name login avatar' })
         .exec()

      if (!token) {
         return res.status(200).json({
            msg: 'Альбом найден',
            album: {
               _id: album._id,
               name: album.name,
               cover: album.cover,
               genres: album.genres,
               artists: album.artists,
               year: album.year,
               likes: album.likes.length,
               like: undefined,
            },
            tracks: tracks.map((obj) => ({
               _id: obj._id,
               album: obj.album,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               like: undefined,
            })),
         })
      }

      const decodedToken = jwt.verify(token, 'ryan_gosling_1337')
      const user = await User.findOne({ _id: decodedToken })

      if (!user) {
         return res.status(200).json({
            msg: 'Альбом найден',
            album: {
               _id: album._id,
               name: album.name,
               cover: album.cover,
               genres: album.genres,
               artists: album.artists,
               year: album.year,
               likes: album.likes.length,
               like: undefined,
            },
            tracks: tracks.map((obj) => ({
               _id: obj._id,
               album: obj.album,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               like: undefined,
            })),
         })
      } else {
         return res.status(200).json({
            msg: 'Альбом найден',
            album: {
               _id: album._id,
               name: album.name,
               cover: album.cover,
               genres: album.genres,
               artists: album.artists,
               year: album.year,
               likes: album.likes.length,
               like: album.likes.includes(user._id),
               loading: false,
            },
            tracks: tracks.map((obj) => ({
               _id: obj._id,
               album: obj.album,
               name: obj.name,
               file: obj.file,
               artists: obj.artists,
               duration: obj.duration,
               like: obj.likes.includes(user._id),
               loading: false,
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

export default getAlbum
