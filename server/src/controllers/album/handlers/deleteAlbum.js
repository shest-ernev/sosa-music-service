import Album from '../../../models/Album.js'
import Track from '../../../models/Track.js'

const deleteAlbum = async (req, res) => {
   try {
      const { id } = req.params

      await Album.deleteMany({ _id: id })

      await Track.deleteMany({ album: id })

      return res.status(200).json({
         msg: 'Альбом удалён',
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default deleteAlbum