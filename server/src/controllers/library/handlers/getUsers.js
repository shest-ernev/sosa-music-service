import qs from 'qs'

import User from '../../../models/User.js'

const getUsers = async (req, res) => {
   try {
      const query = qs.parse(req._parsedUrl.query)

      const users = await User.find({
         $or: [
            { 
               name: new RegExp(query?.search, 'i'),
               likes: { $in: req.user._id } 
            }, 
            { 
               login: new RegExp(`${query.search?.replace('@', '')}`, 'i'),
               likes: { $in: req.user._id },
            },
         ],
      })
         .sort({ createdAt: -1 })
         .skip(query.page * 30)
         .limit(30)
         .exec()

      return res.status(200).json({
         msg: 'Ok',
         items: users.map((obj) => ({
            _id: obj._id,
            name: obj.name,
            avatar: obj.avatar,
            login: obj.login,
            loading: false,
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

export default getUsers