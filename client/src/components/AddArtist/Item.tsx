import { FC, ChangeEvent } from 'react'

import { Artist } from 'store/CreateAlbumStore'
import Avatar from 'components/Avatar'
import Input from 'ui/Input'

import style from './AddArtist.module.scss'

type EventItem = ChangeEvent<HTMLInputElement> & {
   artist: Artist
}

type ItemProps = {
   _id: string
   name: string
   avatar?: string
   select?: boolean
   login: string
   onCheck?: (event: EventItem) => void
   onUnCheck?: (event: EventItem) => void
}

const Item: FC<ItemProps> = ({ _id, name, avatar, select, login, onCheck, onUnCheck }) => {
   return (
      <label className={`${style.item} hover`}>
         <div className={style.itemInfo}>
            <Avatar
               className={style.avatar}
               user={{ name, avatar }}
            />
            <p className={style.name}> {name} </p>
         </div>
         <Input
            type='checkbox'
            className={style.checkbox}
            checked={select}
            onChange={(event: EventItem) => {
               event.artist = { _id, name, avatar, login }

               if (event.target.checked) {
                  onCheck ? onCheck(event) : undefined
               } else {
                  onUnCheck ? onUnCheck(event) : undefined
               }
            }}
         />
      </label>
   )
}

export default Item
