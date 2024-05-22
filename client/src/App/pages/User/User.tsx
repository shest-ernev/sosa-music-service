import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Navigate, useParams } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { useRootStore } from 'hooks/useRootStore'
import Loader from 'ui/Loader'
import ErrorPage from 'ui/ErrorPage'
import Alert from 'ui/Alert'
import Profile from './pages/Profile'
import Tracks from './pages/Tracks'

import style from './User.module.scss'

const User: FC = observer(() => {
   const {
      user: { getUser, error, loading, user, clearError, clear },
   } = useRootStore()

   const { login } = useParams()

   useEffect(() => {
      if (login !== undefined) {
         getUser(login)
      }

      return () => clear()
   }, [login])

   return (
      <div className={style.user}>
         {loading.get ? (
            <div className={style.loading}>
               <Loader />
            </div>
         ) : !!error ? (
            <ErrorPage msg='Такого пользователя нет' />
         ) : (
            <>
               <Helmet title={user.name} />
               <Routes>
                  <Route index element={<Navigate to='profile' />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='musics' element={<Tracks />} />
                  <Route path='*' element={<ErrorPage msg='Такой страницы нет' />} />
               </Routes>
               <Alert 
                  type='error'
                  text={error}
                  open={!!error}
                  onClose={() => clearError()}
               />
            </>
         )}
      </div>
   )
})

export default User
