import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import qs from 'qs'

import { useRootStore } from 'hooks/useRootStore'
import { useLocalStore } from './useLocalStore'
import Trigger from 'components/Trigger'
import Album from 'entities/Album'
import api from 'config/api'
import Filter from './components/Filter'

import style from './Albums.module.scss'

const Albums: FC = observer(() => {
   const { filter } = useRootStore()
   const albums = useLocalStore()

   const navigate = useNavigate()

   useEffect(() => {
      const search = location.search
      const query = qs.parse(search.substring(1))

      if (query.search !== undefined && typeof query.search === 'string') {
         filter.setSearch(query.search)
      }

      if (query.genres !== undefined) {
         filter.setGenres(query.genres)
      }
   }, [])

   useEffect(() => {
      albums.setPage(0)

      const req = setTimeout(() => albums.searchReq(api.album.getAlbums(location.search)), 500)

      return () => clearTimeout(req)
   }, [filter.search, filter.genres.join('')])

   useEffect(() => {
      const query = qs.stringify({
         search: filter.search.replace(/\s+/g, ' ').trim(),
         genres: filter.genres,
         page: albums.page,
      })

      navigate(`?${query}`)
   }, [filter.search, albums.page, filter.genres.join('')])

   return (
      <div className={style.albums}>
         <Helmet title='Альбомы' />
         <Filter />
         <div className={style.cntr}>
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
            className={style.trigger}
            end={albums.end}
            loading={albums.loading}
            request={() => {
               albums.incPage()
               albums.getItems(api.album.getAlbums(location.search))
            }}
         />
      </div>
   )
})

export default Albums
