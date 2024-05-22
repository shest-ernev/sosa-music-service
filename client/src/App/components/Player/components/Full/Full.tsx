import { FC, MutableRefObject } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import CloseSvg from 'assets/svg/CloseSvg'
import Button from 'ui/Button'
import SongControll from '../SongControll'
import Progress from '../Progress'
import Volume from '../Volume'

import style from './Full.module.scss'

type FullProps = {
   onClose: () => void
   audio: MutableRefObject<HTMLAudioElement | null>
   open: boolean
}

const Full: FC<FullProps> = observer(({ onClose, audio, open }) => {
   const { player } = useRootStore()

   const track = player.trackList[player.currentAudio]

   return (
      <div className={`${style.full} ${open && style.open}`}>
         <Button
            onClick={onClose}
            className={style.close}
            design='default'
         >
            <CloseSvg />
         </Button>
         <div className={style.controller}>
            <div className={style.trackInfo}>
               <img
                  className={style.cover}
                  src={track.album.cover}
               />
               <Link
                  className={style.name}
                  to={`/album/${track.album._id}`}
                  onClick={onClose}
               >
                  {track.name}
               </Link>
               <p className={style.artists}>
                  {track.artists.map((obj, index) => {
                     if (index < track.artists.length - 1) {
                        return (
                           <span key={obj._id}>
                              <Link
                                 className={style.artist}
                                 onClick={onClose}
                                 to={`/user/${obj.login}/profile`}
                              >
                                 {obj.name},{' '}
                              </Link>
                           </span>
                        )
                     } else {
                        return (
                           <span key={obj._id}>
                              <Link
                                 className={style.artist}
                                 onClick={onClose}
                                 to={`/user/${obj.login}/profile`}
                              >
                                 {obj.name}
                              </Link>
                           </span>
                        )
                     }
                  })}
               </p>
            </div>
            <div className={style.songControll}>
               <SongControll />
            </div>
            <Progress audio={audio} />
            <Volume className={style.volume} />
         </div>
      </div>
   )
})

export default Full
