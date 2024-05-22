import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import qs from 'qs'

import { Artist } from 'store/CreateAlbumStore'
import { useLocalStore } from './useLocalStore'
import Input from 'ui/Input'
import LupaSvg from 'assets/svg/LupaSvg'
import Loader from 'ui/Loader'
import Item from './Item'
import Trigger from 'components/Trigger'

import style from './AddArtist.module.scss'

type AddArtistsProps = {
   arr: Partial<Artist>[]
   onAdd: (artist: Artist) => void
   onDel: (artist: Artist) => void
   className?: string
}

const AddArtist: FC<AddArtistsProps> = observer(({ arr, onAdd, onDel, className }) => {
   const [search, setSearch] = useState<string>('')

   const artists = useLocalStore()

   useEffect(() => {
      if (search === '') {
         return artists.clearItems()
      }

      artists.setPage(0)

      const req = setTimeout(() => {
         const query = qs.stringify({
            search: search,
            page: artists.page,
         })
         
         artists.setEnd(false)
         artists.clearItems()
         artists.incPage()
         artists.getItems(`/users/all?${query}`)
      }, 500)

      return () => clearTimeout(req)
   }, [search])

   return (
      <div className={`${className} ${style.cntr}`}>
         <Input
            type='text'
            className={style.input}
            placeholder='Добавить исполнителя...'
            svg={artists.loading ? <Loader /> : <LupaSvg />}
            onChange={(event) => setSearch(event.target.value)}
            value={search}
         />
         <div className={`${style.items} ${artists.items.length !== 0 && style.itemsOpen}`}>
            {artists.items.map((obj) => (
               <Item
                  key={obj._id}
                  _id={obj._id!}
                  name={obj.name!}
                  avatar={obj.avatar}
                  login={obj.login!}
                  select={!!arr.find((el) => el._id === obj._id)}
                  onCheck={(event) => onAdd(event.artist)}
                  onUnCheck={(event) => onDel(event.artist)}
               />
            ))}
            <Trigger
               className={style.trigger}
               loading={artists.loading}
               end={artists.end}
               request={() => {
                  const query = qs.stringify({
                     search: search,
                     page: artists.page,
                  })

                  artists.getItems(`/users/all?${query}`)
                  artists.incPage()
               }}
            />
         </div>
      </div>
   )
})

export default AddArtist
