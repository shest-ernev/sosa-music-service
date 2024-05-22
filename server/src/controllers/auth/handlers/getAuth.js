const getAuth = async (_, res) => {
   try {
      return res.status(200).json({
         msg: 'Пользователь авторизирован',
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default getAuth
