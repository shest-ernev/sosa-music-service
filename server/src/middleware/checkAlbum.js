import Album from '../models/Album.js'

const checkAlbum = async (req, res, next) => {
   try {
      const { id } = req.params

      const album = await Album.findById(id)

      if (!album) {
         return res.status(404).json({
            msg: 'Альбом не найден',
         })
      }

      if (req.user._id.toString() !== album.user.toString()) {
         return res.status(401).json({
            msg: 'Нет прав'
         })
      }

      next()
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default checkAlbum
