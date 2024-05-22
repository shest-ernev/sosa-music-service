import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import PrevPage from 'components/PrevPage'
import Track from 'components/Track'

import style from './Tracks.module.scss'

const Tracks: FC = observer(() => {
   const {
      user: { tracks, setLikeTrack, user },
      player: { play, setPlay, start, currentAudio, trackList },
   } = useRootStore()

   const track = trackList[currentAudio]

   return (
      <div className={style.tracks}>
         <PrevPage title={`Треки от ${user.name}`} />
         <div className={style.cntr}>
            {tracks.map((obj, index) => (
               <Track
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
