import { FC } from 'react'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import Relizes from 'components/Relizes'
import Info from './components/Info'
import Tracks from './components/Tracks'

import style from './Me.module.scss'

const Me: FC = observer(() => {
   const {
      profile: { albums, tracks },
   } = useRootStore()

   return (
      <div className={style.me}>
         <Helmet title='Профиль' />
         <Info />
         {tracks.length !== 0 && <Tracks />}
         {albums.length !== 0 && <Relizes albums={albums} />}
         {tracks.length === 0 && albums.length === 0 && (
            <p className={style.none}> 😢 У вас пока нет релизов </p>
         )}
      </div>
   )
})

export default Me
