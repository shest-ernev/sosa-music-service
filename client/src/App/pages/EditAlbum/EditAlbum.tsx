import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Helmet } from 'react-helmet'

import { useRootStore } from 'hooks/useRootStore'
import Loader from 'ui/Loader'
import Alert from 'ui/Alert'
import PrevPage from 'components/PrevPage'
import ArtistItem from 'components/ArtistItem'
import Cover from './components/Cover'
import Name from './components/Name'
import Actions from './components/Actions'
import AddTrack from './components/AddTrack'
import AlbumTrack from 'components/AlbumTrack'

import style from './EditAlbum.module.scss'

const Album: FC = observer(() => {
   const { id } = useParams()

   const {
      editAlbum: { getAlbum, loading, error, clearError, res, clearRes, album, tracks, delTrack, clear },
      player: { currentAudio, trackList, start, setPlay, play },
   } = useRootStore()

   useEffect(() => {
      if (id !== undefined) {
         getAlbum(id)
      }

      return () => clear()
   }, [id])

   return (
      <>
         <Helmet title='Редактировать альбом' />
         {loading.get ? (
            <div className={style.loading}>
               <Loader />
            </div>
         ) : error ? (
            <></>
         ) : (
            <>
               <div className={style.album}>
                  <PrevPage title='Редактировать альбом' />
                  <div className={style.cntr}>
                     <div className={style.infoAlbum}>
                        <Cover />
                        <div className={style.info}>
                           <p className={style.genres}> {album.genres?.join(' · ')} </p>
                           <Name />
                           <div className={style.artists}>
                              {album.artists?.map((obj) => (
                                 <ArtistItem
                                    key={obj._id}
                                    avatar={obj.avatar}
                                    login={obj.login}
                                    name={obj.name}
                                 />
                              ))}
                           </div>
                           <Actions />
                        </div>
                     </div>
                     <div className={style.tarcks}>
                        {tracks.map((obj, index) => (
                           <AlbumTrack
                              key={obj._id}
                              index={index + 1}
                              name={obj.name}
                              duration={obj.duration}
                              loading={obj.loading}
                              onDel={() => delTrack(obj._id)}
                              play={trackList[currentAudio]?._id === obj._id}
                              onPlay={() => {
                                 if (trackList[currentAudio]?._id === obj._id) {
                                    setPlay(!play)
                                 } else {
                                    start(index, tracks)
                                 }
                              }}
                           />
                        ))}
                     </div>
                     <AddTrack />
                  </div>
               </div>
               <Alert
                  type='error'
                  open={!!error && error !== 'Ошибка сервера'}
                  text={error}
                  onClose={() => clearError()}
               />
               <Alert
                  type='text'
                  open={!!res}
                  onClose={() => clearRes()}
                  text={res}
               />
            </>
         )}
      </>
   )
})

export default Album
