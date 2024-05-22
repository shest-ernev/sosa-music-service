import { FC } from 'react'

import Button from 'ui/Button'
import CartSvg from 'assets/svg/CartSvg'
import LikeSvg from 'assets/svg/LikeSvg'

import style from './AlbumTrack.module.scss'

type AlbumTrackProps = {
   index: number
   play?: boolean
   name: string
   duration: string
   onPlay?: () => void
   onDel?: () => void
   loading?: boolean
   like?: boolean
   onLike?: () => void
}

const AlbumTrack: FC<AlbumTrackProps> = ({ index, play, name, onPlay, duration, onDel, loading, like, onLike }) => {
   return (
      <div className={`${style.track} hover`}>
         <button 
            className={style.info}
            onClick={onPlay}
         >
            {play ? <div className={style.play} /> : <p className={style.index}> {index} </p>}
            <div className={style.tarckText}>
               <p className={style.name}> {name} </p>
            </div>
         </button>
         <div className={style.actions}>
            <p className={style.duration}> {duration} </p>
            {like !== undefined && (
               <Button
                  className={`${style.like} ${like && style.likeActive}`}
                  design='default'
                  onClick={onLike}
                  loading={loading}
               >
                  <LikeSvg />
               </Button>
            )}
            {onDel && (
               <Button
                  className={style.del}
                  design='default'
                  onClick={onDel}
                  loading={loading}
               >
                  <CartSvg />
               </Button>
            )}
         </div>
      </div>
   )
}

export default AlbumTrack
