import { FC, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import qs from 'qs'

import { useRootStore } from 'hooks/useRootStore'
import { useTimeFormat } from 'hooks/useTimeFormat'
import Button from 'ui/Button'
import UploadSvg from 'assets/svg/UploadSvg'
import Alert from 'ui/Alert'
import ArtistItem from 'components/ArtistItem'
import AddArtist from 'components/AddArtist'

import style from './AddTrack.module.scss'

const Musics: FC = observer(() => {
   const [err, setErr] = useState<string>('')

   const inputRef = useRef<HTMLInputElement | null>(null)
   const audioRef = useRef<HTMLAudioElement | null>(null)

   const {
      editAlbum: { album, loading, addTrack, createTrack, setNameTrack, setDuration, addArtists, delArtist, setFile },
   } = useRootStore()

   const submit = async () => {
      if (createTrack.name.replace(/\s+/g, ' ').trim().length === 0) {
         return setErr('Введите название трека')
      }

      if (createTrack.file.url === '') {
         return setErr('Загрузите трек')
      }

      const res = await fetch(createTrack.file.url).then((res) => res.blob())
      const file = new FormData()

      file.append('audio', res)

      if (album.artists !== undefined) {
         const query = qs.stringify({
            name: createTrack.name.trim(),
            artists: [...album.artists, ...createTrack.artists],
            duration: useTimeFormat(createTrack.duration),
         })

         addTrack(album._id!, file, query)
      }
   }

   return (
      <>
         <div className={style.musics}>
            <div className={style.info}>
               <Button
                  className={style.upload}
                  design='default'
                  onClick={() => inputRef.current?.click()}
               >
                  <UploadSvg />
                  <p> {!!createTrack.file?.name ? createTrack.file.name : 'Загрузить (mp3)'} </p>
               </Button>
               <input
                  type='text'
                  placeholder='Название трека...'
                  className={style.name}
                  value={createTrack.name}
                  onChange={(event) => setNameTrack(event.target.value)}
                  maxLength={50}
               />
            </div>
            <div className={style.artists}>
               {album.artists?.map((obj) => (
                  <ArtistItem
                     key={obj._id}
                     name={obj.name}
                     avatar={obj.avatar}
                  />
               ))}
               {createTrack.artists.map((obj) => (
                  <ArtistItem
                     key={obj._id}
                     name={obj.name}
                     avatar={obj.avatar}
                     onDelete={() => {
                        if (obj._id !== undefined) {
                           delArtist(obj._id)
                        }
                     }}
                  />
               ))}
               <AddArtist
                  arr={createTrack.artists}
                  onDel={(artist) => addArtists(artist)}
                  className={style.addArtist}
                  onAdd={(artist) => {
                     const findItem = album.artists?.find((obj) => obj._id === artist._id)

                     if (!findItem) {
                        addArtists(artist)
                     }
                  }}
               />
            </div>
            <Button
               className={style.save}
               onClick={submit}
               loading={loading.addTrack}
            >
               Опубликовать
            </Button>
         </div>
         <input
            type='file'
            style={{ display: 'none' }}
            accept='.mp3'
            ref={inputRef}
            onChange={(event) => {
               if (event.target.files === null) {
                  event.target.value = ''
                  return setErr('Файл пуст')
               }

               const file = event.target.files[0]

               if (!file.name.match(/\.(mp3)$/)) {
                  event.target.value = ''
                  return setErr('Не корректный файл')
               }

               URL.revokeObjectURL(createTrack.file.url)
               setFile(file.name, URL.createObjectURL(file))
               event.target.value = ''
            }}
         />
         <audio
            style={{ display: 'none' }}
            ref={audioRef}
            src={createTrack.file.url}
            onLoadedData={() => {
               if (!!audioRef.current) {
                  setDuration(audioRef.current.duration)
               }
            }}
         />
         <Alert
            type='error'
            open={!!err}
            onClose={() => setErr('')}
            text={err}
         />
      </>
   )
})

export default Musics
