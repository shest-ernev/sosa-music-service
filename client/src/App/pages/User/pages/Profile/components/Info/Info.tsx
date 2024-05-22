import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useFormatNumber } from 'hooks/useFormatNumber'
import { useRootStore } from 'hooks/useRootStore'
import Avatar from 'components/Avatar'
import Button from 'ui/Button'
import Dropboard from 'ui/Dropboard'
import Alert from 'ui/Alert'
import SubsSvg from 'assets/svg/SubsSvg'
import PlaySvg from 'assets/svg/PlaySvg'
import LikeSvg from 'assets/svg/LikeSvg'
import CopySvg from 'assets/svg/CopySvg'
import ErrorSvg from 'assets/svg/ErrorSvg'

import style from './Info.module.scss'

const Info: FC = observer(() => {
   const [copy, setCopy] = useState<boolean>(false)

   const {
      user: { user, loading, setLike, tracks },
      player: { start }
   } = useRootStore()

   return (
      <>
         <div
            className={`${style.info} ${!!user.cover && style.cover}`}
            style={{ backgroundImage: !!user.cover ? `url(${user.cover})` : 'none' }}
         >
            <div className={`${style.cntr} ${!!user.cover && style.coverCntr}`}>
               <Avatar
                  className={style.avatar}
                  user={{
                     name: user.name,
                     avatar: user.avatar,
                  }}
               />
               <div className={style.infoLinks}>
                  <p className={style.name}> {user.name} </p>
                  <div className={style.subs}>
                     <SubsSvg />
                     <p> {user.likes !== undefined && useFormatNumber(user.likes)} слушателей </p>
                  </div>
                  <div className={style.actions}>
                     <Button 
                        className={style.play}
                        onClick={() => start(0, tracks)}
                     >
                        <PlaySvg />
                        <p> Слушать </p>
                     </Button>
                     {user.like !== undefined && (
                        <Button
                           design='default'
                           loading={loading.setLike}
                           className={`${style.like} ${user.like && style.likeActive}`}
                           onClick={() => {
                              if (user._id !== undefined) {
                                 setLike(user._id)
                              }
                           }}
                        >
                           <LikeSvg />
                        </Button>
                     )}
                     <Dropboard
                        className={style.dropboard}
                        items={[
                           {
                              key: 0,
                              text: 'Скопировать ссылку',
                              icon: <CopySvg />,
                              onClick: () => {
                                 navigator.clipboard.writeText(`${location.origin}/user/${user.login}`)
                                 setCopy(true)
                              },
                           },
                        ]}
                     />
                  </div>
               </div>
            </div>
         </div>
         <Alert
            open={copy}
            onClose={() => setCopy(false)}
            text='Ссылка на пользователя скопирована'
         />
      </>
   )
})

export default Info
