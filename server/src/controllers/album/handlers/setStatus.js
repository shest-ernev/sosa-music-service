import Album from '../../../models/Album.js'
import Track from '../../../models/Track.js'

const setStatus = async (req, res) => {
   try {
      const { status } = req.body
      const { id } = req.params

      const album = await Album.findOneAndUpdate(
         { _id: id },
         { published: status },
         { new: true }
      )

      await Track.updateMany(
         { album: album._id },
         { published: album.published },
      )

      return res.status(200).json({
         msg: status ? 'Опубликован' : 'Скрыт',
         status,
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default setStatus