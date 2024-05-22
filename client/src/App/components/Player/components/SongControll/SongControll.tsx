import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import PlaySvg from 'assets/svg/PlaySvg'
import PauseSvg from 'assets/svg/PauseSvg'
import RewindPrevSvg from 'assets/svg/RewindPrevSvg'
import RewindNextSvg from 'assets/svg/RewindNextSvg'
import ShuffleSvg from 'assets/svg/ShuffleSvg'
import RepeatSvg from 'assets/svg/RepeatSvg'
import RepeatOneSvg from 'assets/svg/RepeatOneSvg'

import style from './SongControll.module.scss'

const SongControll: FC = observer(() => {
   const { player } = useRootStore()

   return (
      <div className={style.btns}>
         <button
            onClick={() => player.setShuffle(!player.shuffle)}
            className={`${style.shuffle} ${player.shuffle && style.shuffleActive} hover`}
         >
            <ShuffleSvg />
         </button>
         <div className={style.song}>
            <button
               className={style.rewind}
               disabled={player.trackList[player.currentAudio - 1] === undefined && player.repeat !== 1}
               onClick={player.rewindPrev}
            >
               <RewindPrevSvg />
            </button>
            <button
               className={style.play}
               onClick={() => player.setPlay(!player.play)}
            >
               {player.play ? <PauseSvg /> : <PlaySvg className={style.playBtn} />}
            </button>
            <button
               className={style.rewind}
               disabled={player.trackList[player.currentAudio + 1] === undefined && player.repeat !== 1}
               onClick={player.rewindNext}
            >
               <RewindNextSvg />
            </button>
         </div>
         <button
            className={`${style.repeat} ${player.repeat > 0 && style.repeatActive} hover`}
            onClick={() => {
               if (player.repeat < 2) {
                  player.setRepeat(player.repeat + 1)
               } else {
                  player.setRepeat(0)
               }
            }}
         >
            {player.repeat <= 1 ? <RepeatSvg /> : <RepeatOneSvg />}
         </button>
      </div>
   )
})

export default SongControll
