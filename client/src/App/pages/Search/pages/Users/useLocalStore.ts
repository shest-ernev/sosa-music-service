import { useEffect } from 'react'

import { User } from 'types/models/user'
import ListModel from 'store/ListModel'

type Users = Omit<User, 'admin' | 'cover' | 'likes'>

const users = new ListModel<Users>()

export const useLocalStore = (): ListModel<Users> => {
   useEffect(() => {
      return () => users.destroy()
   }, [])

   return users
}
