import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { useRootStore } from 'hooks/useRootStore'
import { useLocalStore } from './useLocalStore'
import api from 'config/api'
import Alert from 'ui/Alert'
import UserCard from 'entities/UserCard'
import Trigger from 'components/Trigger'

import style from './Users.module.scss'

const Users: FC = observer(() => {
   const [copy, setCopy] = useState(false)

   const navigate = useNavigate()

   const users = useLocalStore()
   const {
      filter: { search, setSearch },
   } = useRootStore()

   useEffect(() => {
      const search = location.search
      const query = qs.parse(search.substring(1))

      if (query.search !== undefined && typeof query.search === 'string') {
         setSearch(query.search)
      }
   }, [])

   useEffect(() => {
      users.setPage(0)

      const req = setTimeout(() => users.searchReq(api.user.getUsers(location.search)), 500)

      return () => clearTimeout(req)
   }, [search])

   useEffect(() => {
      const query = qs.stringify({
         search: search.replace(/\s+/g, ' ').trim(),
         page: users.page,
      })

      navigate(`?${query}`)
   }, [search, users.page])

   return (
      <>
         <div className={style.users}>
            {users.items.map((obj) => (
               <UserCard
                  key={obj._id}
                  avatar={obj.avatar}
                  name={obj.name}
                  login={obj.login}
                  like={obj.like}
                  onCopy={() => setCopy(true)}
                  loading={obj.loading}
                  onLike={() => {
                     if (obj._id !== undefined) {
                        users.setLike(api.user.setLike(obj._id), obj._id)
                     }
                  }}
               />
            ))}
            <Trigger
               end={users.end}
               loading={users.loading}
               request={() => {
                  users.incPage()
                  users.getItems(api.user.getUsers(location.search))
               }}
            />
         </div>
         <Alert
            open={copy}
            onClose={() => setCopy(false)}
            text='Ссылка на пользователя скопирована'
         />
         <Alert
            open={!!users.error}
            onClose={() => users.clearError()}
            text={users.error}
            type='error'
         />
      </>
   )
})

export default Users
