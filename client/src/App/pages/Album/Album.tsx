import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { useRootStore } from 'hooks/useRootStore'
import PrevPage from 'components/PrevPage'
import Loader from 'ui/Loader'
import Alert from 'ui/Alert'
import AlbumTrack from 'components/AlbumTrack'
import Info from './components/Info'
import ErrorPage from 'ui/ErrorPage'

import style from './Album.module.scss'

const Album: FC = observer(() => {
   const {
      album: { album, getAlbum, loading, error, clear, tarcks, setLikeTrack, clearError },
      player: { trackList, currentAudio, start, setPlay, play },
   } = useRootStore()

   const { id } = useParams()

   useEffect(() => {
      if (id !== undefined) {
         getAlbum(id)
      }

      return () => clear()
   }, [id])

   return (
      <>
         <div className={style.page}>
            {loading ? (
               <div className={style.load}>
                  <Loader />
               </div>
            ) : error ? (
               <ErrorPage msg='Видимо такого альбома нет' />
            ) : (
               <>
                  <Helmet title={album.name} />
                  <PrevPage title={album.name!} />
                  <div className={style.cntr}>
                     <Info />
                     <div className={style.tracks}>
                        {tarcks.map((obj, index) => (
                           <AlbumTrack
                              key={obj._id}
                              index={index + 1}
                              play={trackList[currentAudio]?._id === obj._id}
                              onPlay={() => {
                                 if (trackList[currentAudio]?._id === obj._id) {
                                    setPlay(!play)
                                 } else {
                                    start(index, tarcks)
                                 }
                              }}
                              name={obj.name}
                              duration={obj.duration}
                              like={obj.like}
                              loading={obj.loading}
                              onLike={() => setLikeTrack(obj._id)}
                           />
                        ))}
                     </div>
                  </div>
                  <Alert
                     type='error'
                     open={!!error}
                     onClose={() => clearError()}
                     text={error}
                  />
               </>
            )}
         </div>
      </>
   )
})

export default Album
