import { validationResult } from 'express-validator'
import moment from 'moment'

import { config } from '../../../config.js'
import Album from '../../../models/Album.js'

const createAlbum = async (req, res) => {
   try {
      const err = validationResult(req)

      if (!err.isEmpty()) {
         return res.status(400).json({
            msg: 'Ошибка валидации данных',
         })
      }

      const { name, genres, artists } = req.body

      if (!req.file) {
         return res.status(400).json({
            msg: 'Загрузите обложку',
         })
      }

      if (!artists.every((obj) => obj._id !== undefined)) {
         return res.status(400).json({
            msg: 'Ошибка валидации данных',
         })
      }

      const doc = new Album({
         user: req.user._id,
         name: name.trim(),
         cover: `${config.url}/albums/${req.file.filename}`,
         genres: genres,
         artists: artists.map((obj) => obj._id),
         year: Number(moment().format('YYYY')),
      })

      const albumDoc = await doc.save()

      const album = await Album.findById(albumDoc._id).populate({ path: 'artists', select: 'name login' })

      return res.status(200).json({
         msg: 'Альбом сохранён',
         album: {
            _id: album._id,
            name: album.name,
            artists: album.artists,
            cover: album.cover,
            admin: true,
            published: album.published
         },
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default createAlbum
