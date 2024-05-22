import { useState, useRef, FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import Default from 'assets/image/defaultCover.png'
import Button from 'ui/Button'
import Alert from 'ui/Alert'
import Cropper from 'components/Cropper'

import style from './Cover.module.scss'

const Cover: FC = observer(() => {
   const [url, setUrl] = useState<string>('')
   const [err, setErr] = useState<boolean>(false)

   const inputRef = useRef<HTMLInputElement | null>(null)

   const {
      profile: { user, loading, setCover, delCover },
   } = useRootStore()

   return (
      <>
         <div className={style.cover}>
            <img src={!!user.cover ? user.cover : Default} />
            <div className={style.text}>
               <p> Изменить обложку </p>
               <p> Загрузите (png, jpeg, jpg) или удалите изображение </p>
            </div>
            <div className={style.actions}>
               <Button
                  className={style.btn}
                  loading={loading.editCover}
                  onClick={() => inputRef.current?.click()}
               >
                  Изменить
               </Button>
               {!!user.cover && (
                  <Button
                     className={style.btn}
                     design='danger'
                     loading={loading.delCover}
                     onClick={() => delCover()}
                  >
                     Удалить
                  </Button>
               )}
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

               if (!file.name.match(/\.(png|jpeg|jpg|webp)$/)) {
                  event.target.value = ''
                  return setErr(true)
               }

               setUrl(URL.createObjectURL(file))
               event.target.value = ''
            }}
         />
         <Cropper
            open={!!url}
            aspect={16 / 6}
            onClose={() => setUrl('')}
            src={url}
            onSubmit={(event) => {
               event.canvas.current?.toBlob((blob) => {
                  if (blob === null) return

                  const file = new FormData()

                  file.append('image', blob)
                  setCover(file)
                  setUrl('')
               })
            }}
         />
         <Alert
            type='error'
            open={err}
            text='Не корректный файл'
            onClose={() => setErr(false)}
         />
      </>
   )
})

export default Cover
