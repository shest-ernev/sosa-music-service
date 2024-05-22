import { Navigate, Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { Helmet } from 'react-helmet'

import ErrorPage from 'ui/ErrorPage'
import Menu from './components/Menu'
import Tracks from './pages/Tracks'
import Users from './pages/Users'
import Albums from './pages/Albums'

import style from './Library.module.scss'

const Library: FC = () => {
   return (
      <div className={style.page}>
         <Helmet title='Библиотека' />
         <Menu />
         <Routes>
            <Route index element={<Navigate to='tracks' />} />
            <Route path='tracks' element={<Tracks />} />
            <Route path='users' element={<Users />} />
            <Route path='albums' element={<Albums />} />
            <Route path='*' element={<ErrorPage msg='Такой страницы нет' />} />
         </Routes>
      </div>
   )
}

export default Library
