import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { useLocalStore } from './useLocalStore'
import Input from 'ui/Input'
import LupaSvg from 'assets/svg/LupaSvg'
import api from 'config/api'
import Album from 'entities/Album'
import Trigger from 'components/Trigger'

import style from './Albums.module.scss'

const Albums: FC = observer(() => {
   const [search, setSearch] = useState<string>('')

   const albums = useLocalStore()
   const navigate = useNavigate()

   useEffect(() => {
      const search = location.search
      const query = qs.parse(search.substring(1))

      if (query.search !== undefined && typeof query.search === 'string') {
         setSearch(query.search)
      }
   }, [])

   useEffect(() => {
      albums.setPage(0)

      const req = setTimeout(() => albums.searchReq(api.library.getAlbums(location.search)), 500)

      return () => clearTimeout(req)
   }, [search])

   useEffect(() => {
      const query = qs.stringify({
         search: search.replace(/\s+/g, ' ').trim(),
         page: albums.page,
      })

      navigate(`?${query}`)
   }, [search, albums.page])

   return (
      <div className={style.albums}>
         <Input
            className={style.input}
            placeholder='Найти альбом...'
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            svg={<LupaSvg />}
         />
         <div className={style.items}>
            {albums.items.map((obj) => (
               <Album
                  key={obj._id}
                  _id={obj._id}
                  cover={obj.cover}
                  className={style.album}
                  name={obj.name}
                  artists={obj.artists}
               />
            ))}
         </div>
         <Trigger
            end={albums.end}
            loading={albums.loading}
            request={() => {
               albums.incPage()
               albums.getItems(api.library.getAlbums(location.search))
            }}
         />
      </div>
   )
})

export default Albums
