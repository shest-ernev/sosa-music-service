import { unlink } from 'fs'

import { config } from '../../../config.js'
import Track from '../../../models/Track.js'

const delTrack = async (req, res) => {
   try {
      const { id } = req.params

      const track = await Track.findById(id).populate('album')

      if (!track) {
         return res.status(404).json({
            msg: 'Трек не найден',
         })
      }

      if (track.album.user.toString() !== req.user._id.toString()) {
         return res.status(401).json({
            msg: 'Нет прав',
         })
      }

      if (!!track.file) {
         unlink(track.file.replace(config.url, 'public'), (err) => {
            if (err) {
               return res.status(404).json({
                  msg: 'Файл трека не найден',
               })
            }
         })
      }

      await Track.findOneAndDelete({ _id: id })

      return res.status(200).json({
         msg: 'Трек удалён',
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default delTrack