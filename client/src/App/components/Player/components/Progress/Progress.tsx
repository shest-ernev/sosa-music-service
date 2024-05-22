import { FC, MutableRefObject } from 'react'
import { observer } from 'mobx-react-lite'

import { useTimeFormat } from 'hooks/useTimeFormat'
import { useRootStore } from 'hooks/useRootStore'
import Input from 'ui/Input'

import style from './Progress.module.scss'

type ProgressType = {
   audio: MutableRefObject<HTMLAudioElement | null>
   className?: string
}

const Progress: FC<ProgressType> = observer(({ audio, className }) => {
   const { player } = useRootStore()

   return (
      <div className={`${style.progress} ${className}`}>
         <p> {useTimeFormat(player.currentTime)} </p>
         <Input
            type='range'
            className={style.range}
            min={0}
            max={100}
            step={1}
            value={player.progress}
            onChange={(event) => {
               if (audio.current === null) {
                  return
               }

               audio.current.currentTime = (player.duration / 100) * Number(event.target.value)
               player.setProgress((player.currentTime / player.duration) * 100)
            }}
         />
         <p> {useTimeFormat(player.duration)} </p>
      </div>
   )
})

export default Progress
