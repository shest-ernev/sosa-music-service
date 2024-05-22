import { FC, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import ErrorPage from 'ui/ErrorPage'
import Nav from './components/Nav'
import Player from './components/Player'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Search from './pages/Search'
import User from './pages/User'
import EditAlbum from './pages/EditAlbum'
import Album from './pages/Album'
import Library from './pages/Library'
import Main from './pages/Main'

import style from './App.module.scss'

const App: FC = observer(() => {
   const {
      auth: { auth, getAuth },
      player: { trackList },
   } = useRootStore()

   useEffect(() => {
      if (!!localStorage.getItem('token')) {
         getAuth()
      }
   }, [])

   return (
      <div className={style.app}>
         <Nav />
         <div className={style.wrapper}>
            <div className={style.page}>
               <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/auth/*' element={auth ? <Navigate to='/profile' replace /> : <Auth />} />
                  <Route path='/profile/*' element={auth ? <Profile /> : <Navigate to='/auth' replace />} />
                  <Route path='/search/*' element={<Search />} />
                  <Route path='/user/:login/*' element={<User />} />
                  <Route path='/edit-album/:id' element={auth ? <EditAlbum /> : <Navigate to='/auth' replace />} />
                  <Route path='/album/:id' element={<Album />} />
                  <Route path='/library/*' element={<Library />} />
                  <Route path='*' element={<ErrorPage msg='Такой страницы нет' />} />
               </Routes>
            </div>
            {trackList.length !== 0 && <Player />}
         </div>
      </div>
   )
})

export default App
