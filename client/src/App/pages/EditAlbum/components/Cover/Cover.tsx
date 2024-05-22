import { FC, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import Cropper from 'components/Cropper'
import Button from 'ui/Button'
import Alert from 'ui/Alert'

import style from './Cover.module.scss'

const Cover: FC = observer(() => {
   const [url, setUrl] = useState<string>('')
   const [err, setErr] = useState<boolean>(false)

   const inputRef = useRef<HTMLInputElement | null>(null)

   const {
      editAlbum: { album, loading, setCover },
   } = useRootStore()

   return (
      <>
         <div className={style.cover}>
            <img src={album.cover} />
            <div className={`${style.editCover} ${loading.setCover && style.loading}`}>
               <Button
                  className={style.btn}
                  onClick={() => inputRef.current?.click()}
                  loading={loading.setCover}
               >
                  Изменить обложку
               </Button>
            </div>
         </div>
         <input
            type='file'
            ref={inputRef}
            style={{ display: 'none' }}
            accept='.jpg,.jpeg,.png'
            onChange={(event) => {
               if (event.target.files === null) {
                  event.target.value = ''
                  return setErr(true)
               }

               const file = event.target.files[0]

               if (!file.name.match(/\.(png|jpeg|jpg)$/)) {
                  event.target.value = ''
                  return setErr(true)
               }

               setUrl(URL.createObjectURL(file))
               event.target.value = ''
            }}
         />
         <Cropper 
            open={!!url}
            src={url}
            onClose={() => setUrl('')}
            aspect={1}
            onSubmit={(event) => {
               event.canvas.current?.toBlob((blob) => {
                  if (blob === null) return

                  const file = new FormData()

                  file.append('image', blob)
                  setCover(album._id!, file)
                  setUrl('')
               })
            }}
         />
         <Alert 
            type='error'
            open={err}
            onClose={() => setErr(false)}
            text='Не коррекнтый файл'
         />
      </>
   )
})

export default Cover
