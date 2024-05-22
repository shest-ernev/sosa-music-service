import Album from '../../../models/Album.js'
import Track from '../../../models/Track.js'

const getEditAlbum = async (req, res) => {
   try {
      const { id } = req.params

      const album = await Album.findById(id).populate({ path: 'artists', select: 'name login avatar' })
      const tracks = await Track.find({ album: id })
         .populate({ path: 'album', select: 'cover' })
         .populate({ path: 'artists', select: 'name login avatar' })

      return res.status(200).json({
         msg: 'Альбом найден',
         album: {
            _id: album._id,
            name: album.name,
            cover: album.cover,
            genres: album.genres,
            artists: album.artists,
            year: album.year,
            published: album.published,
            loading: false,
         },
         tracks: tracks.map((obj) => ({
            _id: obj._id,
            album: obj.album,
            name: obj.name,
            file: obj.file,
            artists: obj.artists,
            duration: obj.duration,
            loading: false,
         })),
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getEditAlbum
