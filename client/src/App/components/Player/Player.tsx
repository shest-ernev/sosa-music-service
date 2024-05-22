import { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import { useKey } from 'hooks/useKey'
import Volume from './components/Volume'
import SongControll from './components/SongControll'
import Progress from './components/Progress'
import Info from './components/Info'
import MobilePlayer from './components/MobilePlayer'
import Full from './components/Full'

import style from './Player.module.scss'

const Player: FC = observer(() => {
   const [open, setOpen] = useState<boolean>(false)

   const { player } = useRootStore()

   const audioRef = useRef<HTMLAudioElement | null>(null)

   const track = player.trackList[player.currentAudio]

   useEffect(() => {
      if (player.play) {
         audioRef.current?.play()
      } else {
         audioRef.current?.pause()
      }
   }, [player.play])

   useKey('MediaTrackNext', player.rewindNext)
   useKey('MediaTrackPrevious', player.rewindPrev)
   useKey('Escape', () => setOpen(false))

   return (
      <>
         <audio
            src={track?.file || ''}
            ref={audioRef}
            onPause={() => player.setPlay(false)}
            onPlay={() => player.setPlay(true)}
            onTimeUpdate={() => {
               if (!!audioRef.current) {
                  player.setCurrentTime(audioRef.current?.currentTime)
                  player.setProgress((player.currentTime / player.duration) * 100)
                  audioRef.current.volume = player.volume
               }
            }}
            onEnded={() => player.onEnded(audioRef)}
            onLoadedData={() => player.onLoadedData(audioRef)}
         />
         <div className={style.player}>
            <Info
               _id={track.album._id}
               cover={track.album.cover}
               name={track.name}
               artists={track.artists}
               onClick={() => setOpen(true)}
            />
            <div className={style.controller}>
               <SongControll />
               <Progress audio={audioRef} />
            </div>
            <div className={style.actions}>
               <Volume className={style.volume} />
            </div>
         </div>
         <MobilePlayer onClick={() => setOpen(true)} />
         <Full 
            onClose={() => setOpen(false)} 
            audio={audioRef}
            open={open}
         />
      </>
   )
})

export default Player
