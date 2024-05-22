import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import qs from 'qs'

import { useLocalStore } from './useLocalStore'
import { useRootStore } from 'hooks/useRootStore'
import Trigger from 'components/Trigger'
import Track from 'components/Track'
import api from 'config/api'

import style from './Tracks.module.scss'

const Tracks: FC = observer(() => {
   const navigate = useNavigate()

   const {
      filter: { search, setSearch },
      player: { start, currentAudio, trackList, setPlay, play }
   } = useRootStore()

   const tracks = useLocalStore()

   const track = trackList[currentAudio]

   useEffect(() => {
      const search = location.search
      const query = qs.parse(search.substring(1))

      if (query.search !== undefined && typeof query.search === 'string') {
         setSearch(query.search)
      }
   }, [])

   useEffect(() => {
      tracks.setPage(0)

      const req = setTimeout(() => tracks.searchReq(api.track.getTracks(location.search)), 500)

      return () => clearTimeout(req)
   }, [search])

   useEffect(() => {
      const query = qs.stringify({
         search: search.replace(/\s+/g, ' ').trim(),
         page: tracks.page,
      })

      navigate(`?${query}`)
   }, [search, tracks.page])

   return (
      <div className={style.tarcks}>
         {tracks.items.map((obj, index) => (
            <Track
               key={obj._id}
               album={obj.album}
               artists={obj.artists}
               name={obj.name}
               like={obj.like}
               loading={obj.loading}
               duration={obj.duration}
               onLike={() => tracks.setLike(api.track.setLike(obj._id), obj._id)}
               play={track?._id === obj._id}
               onPlay={() => {
                  if (track?._id === obj._id) {
                     setPlay(!play)
                  } else {
                     start(index, tracks.items)
                  }
               }}
            />
         ))}
         <Trigger
            loading={tracks.loading}
            end={tracks.end}
            request={() => {
               tracks.incPage()
               tracks.getItems(api.track.getTracks(location.search))
            }}
         />
      </div>
   )
})

export default Tracks
