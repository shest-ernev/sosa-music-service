import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import ErrorPage from 'ui/ErrorPage'
import Loader from 'ui/Loader'
import Me from './pages/Me'
import Edit from './pages/Edit'
import Add from './pages/Add'
import Tracks from './pages/Tracks'

import style from './Profile.module.scss'

const Profile: FC = observer(() => {
   const {
      profile: { getProfile, loading },
   } = useRootStore()

   useEffect(() => {
      getProfile()
   }, [])

   return (
      <div className={style.page}>
         {loading.get ? (
            <div className={style.loading}>
               <Loader />
            </div>
         ) : (
            <Routes>
               <Route index element={<Navigate to='me' replace /> } />
               <Route path='me' element={<Me />} />
               <Route path='edit' element={<Edit />} />
               <Route path='add' element={<Add />} />
               <Route path='musics' element={<Tracks />} />
               <Route path='*' element={<ErrorPage msg='Такой страницы нет' />} />
            </Routes>
         )}
      </div>
   )
})

export default Profile
