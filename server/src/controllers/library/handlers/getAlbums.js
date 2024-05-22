import qs from 'qs'

import Album from '../../../models/Album.js'

const getAlbums = async (req, res) => {
   try {
      const query = qs.parse(req._parsedUrl.query)

      const albums = await Album.find({
         name: new RegExp(query?.search, 'i'),
         likes: { $in: req.user._id },
         published: true,
      })
         .sort({ createdAt: -1 })
         .skip(query.page * 30)
         .limit(30)
         .populate({ path: 'artists', select: 'name login' })
         .exec()

      return res.status(200).json({
         msg: 'Альбомы найдены',
         items: albums.map((obj) => ({
            _id: obj._id,
            name: obj.name,
            cover: obj.cover,
            artists: obj.artists,
         })),
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getAlbums
