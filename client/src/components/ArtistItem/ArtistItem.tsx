import { FC } from 'react'
import { Link } from 'react-router-dom'

import { User } from 'types/models/user'
import Avatar from 'components/Avatar'
import CloseSvg from 'assets/svg/CloseSvg'

import style from './ArtistItem.module.scss'

type Artist = Pick<Partial<User>, 'avatar' | 'name' | 'login'> & {
   onDelete?: () => void
   onClick?: () => void
}

const ArtistItem: FC<Artist> = ({ avatar, name, onDelete, login, onClick }) => {
   return (
      <div className={`${style.item} ${!!onDelete && style.hover}`}>
         <Link
            to={!!login ? `${location.origin}/user/${login}/profile` : ''}
            className={`${style.info} ${!!login && style.login}`}
            onClick={onClick}
         >
            <Avatar
               user={{
                  name: name!,
                  avatar: avatar!,
               }}
               className={style.avatar}
            />
            <p> {name} </p>
         </Link>
         {!!onDelete && (
            <button
               className={style.delete}
               onClick={() => (onDelete ? onDelete() : undefined)}
            >
               <CloseSvg />
            </button>
         )}
      </div>
   )
}

export default ArtistItem
