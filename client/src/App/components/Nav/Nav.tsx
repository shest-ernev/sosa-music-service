import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import LogoSvg from 'assets/svg/LogoSvg'
import HomeSvg from 'assets/svg/HomeSvg'
import LupaSvg from 'assets/svg/LupaSvg'
import AuthSvg from 'assets/svg/AuthSvg'
import ProfileSvg from 'assets/svg/ProfileSvg'
import LibrarySvg from 'assets/svg/LibrarySvg'

import style from './Nav.module.scss'

const Nav: FC = observer(() => {
   const {
      auth: { auth },
   } = useRootStore()

   const activeClass = (active: boolean): string => active ? `${style.link} ${style.linkActive} hover` : `${style.link} hover`

   return (
      <nav className={style.nav}>
         <div className={style.cntr}>
            <div className={style.logo}>
               <LogoSvg />
               <p> Sosa </p>
            </div>
            <NavLink
               to='/'
               className={({ isActive }) => activeClass(isActive)}
            >
               <HomeSvg />
               <p> Главная </p>
            </NavLink>
            <NavLink
               to='/search'
               className={({ isActive }) => activeClass(isActive)}
            >
               <LupaSvg />
               <p> Поиск </p>
            </NavLink>
            {auth ? (
               <>
                  <NavLink
                     to='/profile'
                     className={({ isActive }) => activeClass(isActive)}
                  >
                     <ProfileSvg />
                     <p> Профиль </p>
                  </NavLink>
                  <NavLink
                     to='/library'
                     className={({ isActive }) => activeClass(isActive)}
                  >
                     <LibrarySvg />
                     <p> Библиотека </p>
                  </NavLink>
               </>
            ) : (
               <NavLink
                  to='/auth'
                  className={({ isActive }) => activeClass(isActive)}
               >
                  <AuthSvg />
                  <p> Войти </p>
               </NavLink>
            )}
         </div>
      </nav>
   )
})

export default Nav
