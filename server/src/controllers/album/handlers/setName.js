import Album from '../../../models/Album.js'

const setName = async (req, res) => {
   try {
      const { id } = req.params
      const { name } = req.body

      const album = await Album.findById(id)

      if (!album) {
         return res.status(404).json({
            msg: 'Альбом не найден',
         })
      }

      if (album.user.toString() !== req.user._id.toString()) {
         return res.status(401).json({
            msg: 'Нет прав на изменение',
         })
      }

      if (album.name === name) {
         return res.status(400).json({
            msg: 'Имя совпадает с существующем',
         })
      }

      await Album.findOneAndUpdate(
         { _id: id }, 
         { name: name.trim() }, 
         { new: true }
      ).then(() => {
         return res.status(200).json({
            msg: 'Имя изменено',
            name,
         })
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default setName
