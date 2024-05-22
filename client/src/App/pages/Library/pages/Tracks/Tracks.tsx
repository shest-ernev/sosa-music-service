import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import qs from 'qs'

import { useLocalStore } from './useLocalStore'
import { useRootStore } from 'hooks/useRootStore'
import Track from 'components/Track'
import Input from 'ui/Input'
import Loader from 'ui/Loader'
import LupaSvg from 'assets/svg/LupaSvg'

import style from './Tracks.module.scss'

const Tracks: FC = observer(() => {
   const [search, setSearch] = useState<string>('')

   const library = useLocalStore()

   const { player: { start, currentAudio, trackList, setPlay, play } } = useRootStore()

   const track = trackList[currentAudio]

   useEffect(() => {
      const req = setTimeout(() => {
         const query = qs.stringify({ search: search.replace(/\s+/g, ' ').trim() })

         library.getTracks(`?${query}`)
      }, 500)

      return () => clearTimeout(req)
   }, [search])

   return (
      <div className={style.tracks}>
         <Input 
            className={style.input}
            placeholder='Найти трек...'
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            svg={library.loading ? <Loader /> : <LupaSvg />}
         />
         <div className={style.items}>
            {library.tracks.map((obj, index) => (
               <Track 
               key={obj._id}
               album={obj.album}
               artists={obj.artists}
               name={obj.name}
               like={obj.like}
               loading={obj.loading}
               duration={obj.duration}
               onLike={() => library.setLike(obj._id)}
               play={track?._id === obj._id}
               onPlay={() => {
                  if (track?._id === obj._id) {
                     setPlay(!play)
                  } else {
                     start(index, library.tracks)
                  }
               }}
               />
            ))}
         </div>
      </div>
   )
})

export default Tracks
