import { validationResult } from 'express-validator'

import Track from '../../../models/Track.js'
import Album from '../../../models/Album.js'

const addTrack = async (req, res) => {
   try {
      const err = validationResult(req)

      if (!err.isEmpty()) {
         return res.status(400).json({
            msg: 'Ошибка валидации данных',
         })
      }

      if (req.file === undefined) {
         return res.status(400).json({
            msg: 'Загрузите файл',
         })
      }

      const { id } = req.params
      const { name, artists, duration } = req.body

      if (!artists.every((obj) => obj._id !== undefined)) {
         return res.status(400).json({
            msg: 'Ошибка валидации данных',
         })
      }

      const album = await Album.findById(id)

      const doc = new Track({
         album: album._id,
         file: `http://localhost:8001/tracks/${req.file.filename}`,
         name: name.trim(),
         artists: artists.map((obj) => obj._id),
         duration,
         published: album.published,
      })

      const trackDoc = await doc.save()

      const track = await Track.findById(trackDoc._id)
         .populate({ path: 'artists', select: 'name login avatar' })
         .populate({ path: 'album', select: 'cover' })

      return res.status(200).json({
         msg: 'Трек добавлен',
         track: {
            _id: track._id,
            album: track.album,
            name: track.name,
            artists: track.artists,
            file: track.file,
            duration: track.duration,
            loading: false,
         }
      })
   } catch (err) {
      console.log(err)
      return res.status(err)
   }
}

export default addTrack
