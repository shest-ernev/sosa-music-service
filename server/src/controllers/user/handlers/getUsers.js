import jwt from 'jsonwebtoken'
import qs from 'qs'

import User from '../../../models/User.js'

const getUsers = async (req, res) => {
   try {
      const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
      const query = qs.parse(req._parsedUrl.query)

      const users = await User.find({
         $or: [{ name: new RegExp(query?.search, 'i') }, { login: new RegExp(`${query.search?.replace('@', '')}`, 'i') }],
      })
         .sort({ createdAt: -1 })
         .skip(query.page * 30)
         .limit(30)
         .exec()

      if (!token) {
         return res.status(200).json({
            msg: 'Ok',
            items: users.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               avatar: obj.avatar,
               login: obj.login,
               loading: false,
               like: undefined,
            })),
         })
      }

      const decodedToken = jwt.verify(token, 'ryan_gosling_1337')
      const user = await User.findOne({ _id: decodedToken })

      if (!user) {
         return res.status(200).json({
            msg: 'Ok',
            items: users.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               avatar: obj.avatar,
               login: obj.login,
               loading: false,
               like: undefined,
            })),
         })
      } else {
         return res.status(200).json({
            msg: 'Ok',
            items: users.map((obj) => ({
               _id: obj._id,
               name: obj.name,
               avatar: obj.avatar,
               login: obj.login,
               loading: false,
               like: obj.likes.includes(user._id),
            })),
         })
      }
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getUsers
