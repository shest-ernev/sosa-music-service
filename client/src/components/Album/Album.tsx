import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { User } from 'types/models/user'
import PencilSvg from 'assets/svg/PencilSvg'
import Button from 'ui/Button'
import Artists from 'components/Artists'

import style from './Album.module.scss'

type AlbumProps = {
   _id: string
   cover: string
   name: string
   artists: Pick<Partial<User>, 'name' | 'login' | '_id' | 'avatar'>[]
   className?: string
   published?: boolean
   admin?: boolean
}

const Album: FC<AlbumProps> = ({ _id, cover, name, artists, className, published, admin }) => {
   const navigate = useNavigate()

   return (
      <div className={`${style.album} ${className} hover`}>
         <Link
            to={`/album/${_id}`}
            className={style.coverLink}
         >
            <img src={cover} />
         </Link>
         <div className={style.info}>
            {admin !== undefined && (
               <Button
                  className={style.edit}
                  design='default'
                  onClick={() => navigate(`/edit-album/${_id}`)}
               >
                  <PencilSvg />
                  <p> {published ? 'Опубликован' : 'Не опубликован'} </p>
               </Button>
            )}
            <p className={style.name}> {name} </p>
            <Artists items={artists} />
         </div>
      </div>
   )
}

export default Album
