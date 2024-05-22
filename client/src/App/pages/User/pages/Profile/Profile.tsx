import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import Info from './components/Info'
import PrevPage from 'components/PrevPage'
import Relizes from 'components/Relizes'
import Tracks from './components/Tracks'

import style from './Profile.module.scss'

const Profile: FC = observer(() => {
   const {
      user: { user, albums, tracks },
   } = useRootStore()

   return (
      <>
         <PrevPage title={`@${user.login}`} />
         <div className={style.profile}>
            <Info />
            {tracks.length !== 0 && <Tracks />}
            {albums.length !== 0 && <Relizes albums={albums} />}
            {tracks.length === 0 && albums.length === 0 && <p className={style.none}> 😢 У исполнителя пока нет релизов </p>}
         </div>
      </>
   )
})

export default Profile
