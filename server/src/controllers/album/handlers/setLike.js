import Album from '../../../models/Album.js'

const setLike = async (req, res) => {
   try {
      const { id } = req.params
      const albumFind = await Album.findById(id)

      if (!albumFind) {
         return res.status(404).json({
            msg: 'Альбом не найден',
         })
      }

      if (albumFind.published === false) {
         return res.status(401).json({
            msg: 'Альбом ещё не опубликован',
         })
      }

      if (!albumFind.likes.includes(req.user._id)) {
         await Album.findOneAndUpdate(
            { _id: id }, 
            { $push: { likes: req.user._id } }, 
            { new: true }
         ).then((doc) => {
            return res.status(200).json({
               msg: 'Лайк поставлен',
               likes: doc.likes.length,
               like: true,
            })
         })
      } else {
         await Album.findOneAndUpdate(
            { _id: id }, 
            { $pull: { likes: req.user._id } }, 
            { new: true }
         ).then((doc) => {
            return res.status(200).json({
               msg: 'Лайк убран',
               likes: doc.likes.length,
               like: false,
            })
         })
      }
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default setLike
