import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { useLocalStore } from './useLocalStore'
import Input from 'ui/Input'
import LupaSvg from 'assets/svg/LupaSvg'
import Trigger from 'components/Trigger'
import UserCard from 'entities/UserCard'
import api from 'config/api'
import Alert from 'ui/Alert'

import style from './Users.module.scss'

const Users: FC = observer(() => {
   const [copy, setCopy] = useState(false)
   const [search, setSearch] = useState<string>('')

   const users = useLocalStore()
   const navigate = useNavigate()

   useEffect(() => {
      const search = location.search
      const query = qs.parse(search.substring(1))

      if (query.search !== undefined && typeof query.search === 'string') {
         setSearch(query.search)
      }
   }, [])

   useEffect(() => {
      users.setPage(0)

      const req = setTimeout(() => users.searchReq(api.library.getUsers(location.search)), 500)

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
            <Input
               className={style.input}
               placeholder='Найти исполнителя...'
               onChange={(event) => setSearch(event.target.value)}
               value={search}
               svg={<LupaSvg />}
            />
            <div className={style.items}>
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
                     users.getItems(api.library.getUsers(location.search))
                  }}
               />
            </div>
         </div>
         <Alert
            type='text'
            open={copy}
            onClose={() => setCopy(false)}
            text='Ссылка скопирована'
         />
      </>
   )
})

export default Users
