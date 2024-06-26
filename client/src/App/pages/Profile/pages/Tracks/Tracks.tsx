import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import PrevPage from 'components/PrevPage'
import TrackCard from 'entities/TrackCard'

import style from './Tracks.module.scss'

const Tracks: FC = observer(() => {
   const {
      profile: { tracks, setLikeTrack },
      player: { play, setPlay, start, currentAudio, trackList },
   } = useRootStore()

   const track = trackList[currentAudio]

   return (
      <div className={style.tracks}>
         <PrevPage title='Ваши треки' />
         <div className={style.cntr}>
            {tracks.map((obj, index) => (
               <TrackCard
                  key={obj._id}
                  album={obj.album}
                  artists={obj.artists}
                  name={obj.name}
                  play={track?._id === obj._id}
                  duration={obj.duration}
                  like={obj.like}
                  onLike={() => setLikeTrack(obj._id)}
                  loading={obj.loading}
                  onPlay={() => {
                     if (track?._id === obj._id) {
                        setPlay(!play)
                     } else {
                        start(index, tracks)
                     }
                  }}
               />
            ))}
         </div>
      </div>
   )
})

export default Tracks
