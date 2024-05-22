import Album from '../../../models/Album.js'
import Track from '../../../models/Track.js'

const getProfile = async (req, res) => {
   try {
      const user = req.user

      const albums = await Album.find({ artists: { $in: req.user._id } })
         .sort({ createdAt: -1 })
         .populate({ path: 'artists', select: 'name login' })

      const tracks = await Track.find({ 
         artists: { $in: req.user._id },
         published: true,
      })
         .sort({ createdAt: -1 })
         .populate({ path: 'album', select: 'cover' })
         .populate({ path: 'artists', select: 'name login avatar' })

      return res.status(200).json({
         msg: 'Пользователь успешно получен',
         user: {
            _id: user._id,
            name: user.name,
            login: user.login,
            avatar: user.avatar,
            cover: user.cover,
            admin: user.admin,
            likes: user.likes.length,
         },
         albums: albums.map((obj) => ({
            _id: obj._id,
            name: obj.name,
            artists: obj.artists,
            cover: obj.cover,
            admin: obj.user.toString() === req.user._id.toString(),
            published: obj.published,
         })),
         tracks: tracks.map((obj) => ({
            _id: obj._id,
            name: obj.name,
            file: obj.file,
            artists: obj.artists,
            duration: obj.duration,
            album: obj.album,
            like: obj.likes.includes(user._id),
            loading: false,
         }))
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getProfile
