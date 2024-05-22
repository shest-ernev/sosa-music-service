import qs from 'qs'

import Track from '../../../models/Track.js'

const getTracks = async (req, res) => {
   try {
      const query = qs.parse(req._parsedUrl.query)

      const tracks = await Track.find({
         name: new RegExp(query?.search, 'i'),
         likes: { $in: req.user._id },
         published: true,
      })
         .populate({ path: 'album', select: 'cover' })
         .populate({ path: 'artists', select: 'name login avatar' })

      return res.status(200).json({
         msg: 'Ок',
         items: tracks.map((obj) => ({
            _id: obj._id,
            name: obj.name,
            file: obj.file,
            artists: obj.artists,
            duration: obj.duration,
            album: obj.album,
            like: obj.likes.includes(req.user._id),
         })),
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getTracks
