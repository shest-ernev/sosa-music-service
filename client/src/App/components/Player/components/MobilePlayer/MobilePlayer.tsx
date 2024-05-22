import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import PauseSvg from 'assets/svg/PauseSvg'
import PlaySvg from 'assets/svg/PlaySvg'
import RewindNextSvg from 'assets/svg/RewindNextSvg'
import { useRootStore } from 'hooks/useRootStore'

import style from './MobilePlayer.module.scss'

const MobilePlayer: FC<{ onClick: () => void }> = observer(({ onClick }) => {
   const { player } = useRootStore()

   const tarck = player.trackList[player.currentAudio]

   return (
      <div className={style.player}>
         <button
            className={style.play}
            onClick={() => player.setPlay(!player.play)}
         >
            {player.play ? <PauseSvg /> : <PlaySvg className={style.playBtn} />}
         </button>
         <button 
            className={style.info}
            onClick={onClick}
         >
            <p> {tarck.name} </p>
            <p className={style.artists}>
               {tarck.artists.map((obj, index) => {
                  if (index < tarck.artists.length - 1) {
                     return (
                        <span 
                           key={obj._id}
                           className={style.artist}
                        >
                           {obj.name},{' '}
                        </span>
                     )
                  } else {
                     return (
                        <span 
                           key={obj._id}
                           className={style.artist}
                        >
                           {obj.name}
                        </span>
                     )
                  }
               })}
            </p>
         </button>
         <button
            className={style.rewind}
            disabled={player.trackList[player.currentAudio + 1] === undefined && player.repeat !== 1}
            onClick={player.rewindNext}
         >
            <RewindNextSvg />
         </button>
      </div>
   )
})

export default MobilePlayer
