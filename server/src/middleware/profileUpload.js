import multer from 'multer'
import moment from 'moment'

const cover = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'public/users/covers')
   },
   filename: (req, _, cb) => {
      const date = moment().format('DD-MM-YY-HH-mm-ss')
      const user = req.user

      cb(null, `${user._id}_${date}.png`)
   },
})

const avatar = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'public/users/avatars')
   },
   filename: (req, _, cb) => {
      const date = moment().format('DD-MM-YY-HH-mm-ss')
      const user = req.user

      cb(null, `${user._id}_${date}.png`)
   },
})

export const profileCover = multer({ storage: cover })
export const profileAvatar = multer({ storage: avatar })
