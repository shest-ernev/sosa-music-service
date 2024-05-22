import { FC } from 'react'
import { Link } from 'react-router-dom'

import { User } from 'types/models/user'

import style from './Artists.module.scss'

type ArtistsProps = {
   items: Pick<Partial<User>, '_id' | 'login' | 'name' | 'avatar'>[]
   className?: string
}

const Artists: FC<ArtistsProps> = ({ items, className }) => {
   return (
      <p className={`${style.artists} ${className}`}>
         {items.map((obj, index) => {
            if (index < items.length - 1) {
               return (
                  <span key={obj._id}>
                     <Link
                        className={style.artist}
                        onClick={(event) => event.stopPropagation()}
                        to={`/user/${obj.login}/profile`}
                     >
                        {obj.name},{' '}
                     </Link>
                  </span>
               )
            } else {
               return (
                  <span key={obj._id}>
                     <Link
                        className={style.artist}
                        onClick={(event) => event.stopPropagation()}
                        to={`/user/${obj.login}/profile`}
                     >
                        {obj.name}
                     </Link>
                  </span>
               )
            }
         })}
      </p>
   )
}

export default Artists
