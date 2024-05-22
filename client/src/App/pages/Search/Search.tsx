import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import ErrorPage from 'ui/ErrorPage'
import Menu from './components/Menu'
import Users from './pages/Users'
import Albums from './pages/Albums'
import Tracks from './pages/Tracks'

import style from './Search.module.scss'

const Search: FC = observer(() => {
   return (
      <div className={style.search}>
         <Helmet title='Поиск' />
         <Menu />
         <div className={style.cntr}>
            <Routes>
               <Route index element={<Navigate to='users' replace />} />
               <Route path='users' element={<Users />} />
               <Route path='albums' element={<Albums />} />
               <Route path='music' element={<Tracks />} />
               <Route path='*' element={<ErrorPage msg='Такой страницы нет' />} />
            </Routes>
         </div>
      </div>
   )
})

export default Search
