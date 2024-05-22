import { useState, useRef, MutableRefObject, FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, NavigateFunction } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import { useFormatNumber } from 'hooks/useFormatNumber'
import SubsSvg from 'assets/svg/SubsSvg'
import PencilSvg from 'assets/svg/PencilSvg'
import CopySvg from 'assets/svg/CopySvg'
import AddSvg from 'assets/svg/AddSvg'
import LogOutSvg from 'assets/svg/LogOutSvg'
import Button from 'ui/Button'
import Dropboard from 'ui/Dropboard'
import Alert from 'ui/Alert'
import Modal from 'ui/Modal'
import Avatar from 'components/Avatar'

import style from './Info.module.scss'

const Info: FC = observer(() => {
   const [copy, setCopy] = useState<boolean>(false)
   const [out, setOut] = useState<boolean>(false)

   const logOutRef = useRef<MutableRefObject<HTMLButtonElement> | null>(null)

   const {
      profile: { user, clearUser },
   } = useRootStore()
   const {
      auth: { logOut },
   } = useRootStore()

   const navigate: NavigateFunction = useNavigate()

   return (
      <>
         <div
            className={`${style.info} ${!!user.cover && style.cover}`}
            style={{ backgroundImage: !!user.cover ? `url(${user.cover})` : 'none' }}
         >
            <div className={`${style.cntr} ${!!user.cover && style.coverCntr}`}>
               <Avatar
                  user={user}
                  className={style.avatar}
               />
               <div className={style.infoLinks}>
                  <p className={style.name}> {user.name} </p>
                  <div className={style.subs}>
                     <SubsSvg />
                     <p> {user.likes !== undefined && useFormatNumber(user.likes)} слушателей </p>
                  </div>
                  <div className={style.actions}>
                     <Button
                        className={style.edit}
                        design='default'
                        onClick={() => navigate('/profile/edit')}
                     >
                        <PencilSvg />
                        <p> Изменить профиль </p>
                     </Button>
                     <Dropboard
                        className={style.dropboard}
                        items={[
                           {
                              key: 0,
                              text: 'Скопировать ссылку',
                              icon: <CopySvg />,
                              onClick: () => {
                                 navigator.clipboard.writeText(`${location.origin}/users/${user.login}`)
                                 setCopy(true)
                              },
                           },
                           {
                              key: 1,
                              text: 'Добавить альбом',
                              icon: <AddSvg />,
                              onClick: () => navigate('/profile/add'),
                           },
                           {
                              key: 2,
                              text: 'Выйти',
                              icon: <LogOutSvg />,
                              type: 'danger',
                              onClick: () => setOut(true),
                              ref: logOutRef,
                           },
                        ]}
                     />
                  </div>
               </div>
            </div>
         </div>
         <Modal
            open={out}
            onClose={() => setOut(false)}
            btn={logOutRef}
            title='Подтверждение'
            onConfirm={() => {
               clearUser()
               logOut()
            }}
         >
            <p className={style.confirmText}>Вы точно хотите выйти из своего аккаунта?</p>
         </Modal>
         <Alert
            open={copy}
            onClose={() => setCopy(false)}
            text='Ссылка профиля скопирована'
         />
      </>
   )
})

export default Info
