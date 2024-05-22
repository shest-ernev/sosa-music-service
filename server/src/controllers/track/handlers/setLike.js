import Track from '../../../models/Track.js'

const setLike = async (req, res) => {
   try {
      const { id } = req.params
      const trackFind = await Track.findById(id)

      if (!trackFind) {
         return res.status(404).json({
            msg: 'Альбом не найден',
         })
      }

      if (trackFind.published === false) {
         return res.status(401).json({
            msg: 'Трек ещё не опубликован',
         })
      }

      if (!trackFind.likes.includes(req.user._id)) {
         await Track.findOneAndUpdate(
            { _id: id }, 
            { $push: { likes: req.user._id } }, 
            { new: true }
         ).then(() => {
            return res.status(200).json({
               msg: 'Лайк поставлен',
               like: true,
            })
         })
      } else {
         await Track.findOneAndUpdate(
            { _id: id }, 
            { $pull: { likes: req.user._id } }, 
            { new: true }
         ).then(() => {
            return res.status(200).json({
               msg: 'Лайк убран',
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
