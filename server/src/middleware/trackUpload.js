import multer from 'multer'
import moment from 'moment'
import qs from 'qs'

const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'public/tracks')
   },
   filename: (req, _, cb) => {
      const date = moment().format('DD-MM-YY-HH-mm-ss')
      const user = req.user 
      const query = qs.parse(req._parsedUrl.query)

      req.body = query

      cb(null, `${user._id}_${date}.mp3`)
   },
})

export const track = multer({ storage })