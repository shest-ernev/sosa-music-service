import { FC, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import DefaultCover from 'assets/image/defaultAvatar.png'
import Cropper from 'components/Cropper'
import Button from 'ui/Button'
import Alert from 'ui/Alert'

import style from './Cover.module.scss'

const Cover: FC = observer(() => {
   const [url, setUrl] = useState<string>('')
   const [err, setErr] = useState<boolean>(false)

   const inputRef = useRef<HTMLInputElement | null>(null)

   const {
      createAlbum: { cover, setCover },
   } = useRootStore()

   return (
      <>
         <div className={style.coverCntr}>
            <img
               className={style.cover}
               src={!!cover ? cover : DefaultCover}
            />
            <div className={style.editCover}>
               <Button
                  className={style.btn}
                  onClick={() => inputRef.current?.click()}
               >
                  {!!cover ? 'Изменить обложку' : 'Добавить обложку'}
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
            onClose={() => setUrl('')}
            src={url}
            aspect={1}
            onSubmit={(event) => {
               event.canvas.current?.toBlob((blob) => {
                  if (blob === null) return

                  URL.revokeObjectURL(cover)
                  setCover(URL.createObjectURL(blob))
                  setUrl('')
               })
            }}
         />
         <Alert
            type='error'
            open={err}
            onClose={() => setErr(false)}
            text='Не корректный файл'
         />
      </>
   )
})

export default Cover
