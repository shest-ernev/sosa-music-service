import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import TrackCard from 'entities/TrackCard'

import style from './Tracks.module.scss'

const Tracks: FC = observer(() => {
   const {
      user: { tracks, setLikeTrack, user },
      player: { start, play, setPlay, currentAudio, trackList },
   } = useRootStore()

   const track = trackList[currentAudio]

   return (
      <div className={style.tracks}>
         <Link
            className={style.link}
            to={`/user/${user.login}/musics`}>
            Треки
         </Link>
         <div className={style.cntr}>
            {tracks.map((obj, index) => {
               if (index < 5) {
                  return (
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
                  )
               }
            })}
         </div>
      </div>
   )
})

export default Tracks
