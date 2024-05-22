import User from '../../../models/User.js'

const setLike = async (req, res) => {
   try {
      const { id } = req.params
      const userFind = await User.findById(id)

      if (!userFind) {
         return res.status(404).json({
            msg: 'Пользователь не найден',
         })
      }

      if (!userFind.likes.includes(req.user._id)) {
         await User.findOneAndUpdate({ _id: id }, { $push: { likes: req.user._id } }, { new: true }).then((doc) => {
            return res.status(200).json({
               msg: 'Лайк поставлен',
               like: true,
               likes: doc.likes.length,
            })
         })
      } else {
         await User.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user._id } }, { new: true }).then((doc) => {
            return res.status(200).json({
               msg: 'Лайк убран',
               like: false,
               likes: doc.likes.length,
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
