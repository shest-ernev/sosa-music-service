import { observer } from 'mobx-react-lite'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import ErrorPage from 'ui/ErrorPage'
import Alert from 'ui/Alert'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import style from './Auth.module.scss'

const Auth = observer(() => {
   const {
      auth: { error, clearError },
   } = useRootStore()

   return (
      <>
         <div className={style.page}>
            <div className={style.formCntr}>
               <nav className={style.menu}>
                  <NavLink
                     to='sign-in'
                     className={({ isActive }) =>
                        isActive ? `${style.link} ${style.linkActive} hover` : `${style.link} hover`
                     }
                  >
                     Войти
                  </NavLink>
                  <NavLink
                     to='sign-up'
                     className={({ isActive }) =>
                        isActive ? `${style.link} ${style.linkActive} hover` : `${style.link} hover`
                     }
                  >
                     Регистрация
                  </NavLink>
               </nav>
               <div className={style.cntr}>
                  <Routes>
                     <Route index element={<Navigate to='sign-in' replace />} />
                     <Route path='sign-in' element={<SignIn />} />
                     <Route path='sign-up' element={<SignUp />} />
                     <Route path='*' element={<ErrorPage msg='Такой страницы нет' />} />
                  </Routes>
               </div>
            </div>
         </div>
         <Alert 
            type='error' 
            text={error} 
            open={!!error} 
            onClose={() => clearError()} 
         />
      </>
   )
})

export default Auth
