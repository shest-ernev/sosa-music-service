import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const checkToken = async (req, res, next) => {
   try {
      const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

      if (!token) {
         return res.status(404).json({
            msg: 'Пользователь не найден',
         })
      }

      const decodedToken = jwt.verify(token, 'ryan_gosling_1337')

      const user = await User.findOne({ _id: decodedToken })

      if (!user) {
         return res.status(404).json({
            msg: 'Пользователь не найден',
         })
      }

      req.user = user

      next()
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка на сервере',
      })
   }
}

export default checkToken
