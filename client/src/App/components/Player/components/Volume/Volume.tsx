import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import Input from 'ui/Input'
import VolumeSvg from 'assets/svg/VolumeSvg'
import VolumeNullSvg from 'assets/svg/VolumeNullSvg'

import style from './Volume.module.scss'

const Volume: FC<{ className?: string }> = observer(({ className }) => {
   const { player } = useRootStore()

   return (
      <div className={`${style.volume} ${className}`}>
         <button
            className={`${style.volumeBtn} hover`}
            onClick={() => {
               if (player.volume === 0) {
                  player.setVolume(0.5)
               } else {
                  player.setVolume(0)
               }
            }}
         >
            {player.volume === 0 ? <VolumeNullSvg /> : <VolumeSvg />}
         </button>
         <Input 
            type='range'
            className={style.rangeVolume}
            min={0}
            max={1}
            step={0.01}
            value={player.volume}
            onChange={(event) => player.setVolume(Number(event.target.value))}
         />
      </div>
   )
})

export default Volume
