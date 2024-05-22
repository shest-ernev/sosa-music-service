import { unlink } from 'fs'

import Album from '../../../models/Album.js'

const setCover = async (req, res) => {
   try {
      const { id } = req.params

      const album = await Album.findById(id)

      if (!album) {
         return res.status(404).json({
            msg: 'Такого альбома нет',
         })
      }

      if (album.user.toString() !== req.user._id.toString()) {
         return res.status(401).json({
            msg: 'Нет прав на изменение',
         })
      }

      if (!!album.cover) {
         unlink(album.cover.replace('http://localhost:8001', 'public'), (err) => {
            if (err) {
               console.log(err)
            }
         })
      }

      await Album.findOneAndUpdate(
         { _id: id },
         { cover: `http://localhost:8001/albums/${req.file.filename}` },
         { new: true }
      ).then((doc) => {
         return res.status(200).json({
            msg: 'Обложка изменена',
            cover: doc.cover,
         })
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default setCover
