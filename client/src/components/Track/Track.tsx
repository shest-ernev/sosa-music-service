import { FC } from 'react'
import { Link } from 'react-router-dom'

import { User } from 'types/models/user'
import { Album } from 'types/models/album'
import Artists from 'components/Artists'
import Button from 'ui/Button'
import LikeSvg from 'assets/svg/LikeSvg'

import style from './Track.module.scss'

type TrackProps = {
   name: string
   artists: Pick<Partial<User>, "_id" | "login" | "name" | "avatar">[]
   album: Pick<Album, '_id' | 'cover'>
   onPlay: () => void
   like?: boolean
   onLike?: () => void
   loading?: boolean
   duration: string
   play: boolean
}

const Track: FC<TrackProps> = ({ name, artists, album, onPlay, like, onLike, loading, duration, play }) => {
   return (
      <div className={`${style.track} hover`}>
         <button 
            className={style.info}
            onClick={onPlay}
         >
            <div className={style.cover}>
               <img src={album?.cover} />
               <div className={`${style.play} ${play && style.playActive}`}>
                  <span />
               </div>
            </div>
            <div className={style.textInfo}>
               <Link 
                  className={style.name}
                  to={`/album/${album._id}`}
                  onClick={(event) => event.stopPropagation()}
               > 
                  {name} 
               </Link>
               <Artists 
                  items={artists}
                  className={style.artists} 
               />
            </div>
         </button>
         <div className={style.actions}>
            <p className={style.duration}> {duration} </p>
            {like !== undefined && (
               <Button
                  className={`${style.like} ${like && style.likeActive}`}
                  onClick={onLike}
                  loading={loading}
                  design='default'
               >
                  <LikeSvg />
               </Button>
            )}
         </div>
      </div>
   )
}

export default Track
