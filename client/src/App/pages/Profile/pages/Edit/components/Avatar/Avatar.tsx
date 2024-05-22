import { FC, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import Default from 'assets/image/defaultAvatar.png'
import Button from 'ui/Button'
import Alert from 'ui/Alert'
import Cropper from 'components/Cropper'

import style from './Avatar.module.scss'

const Avatar: FC = observer(() => {
   const [url, setUrl] = useState<string>('')
   const [err, setErr] = useState<boolean>(false)

   const inputRef = useRef<HTMLInputElement | null>(null)

   const {
      profile: { user, loading, setAvatar, delAvatar },
   } = useRootStore()

   return (
      <>
         <div className={style.avatar}>
            <img src={!!user.avatar ? user.avatar : Default} />
            <div className={style.actions}>
               <div className={style.text}>
                  <p> Изменить аватар </p>
                  <p> Загрузите (png, jpeg, jpg) или удалите изображение </p>
               </div>
               <div className={style.btns}>
                  <Button
                     className={style.btn}
                     loading={loading.editAvatar}
                     onClick={() => inputRef.current?.click()}
                  >
                     Изменить
                  </Button>
                  {!!user.avatar && (
                     <Button
                        design='danger'
                        className={style.btn}
                        loading={loading.delAvatar}
                        onClick={() => delAvatar()}
                     >
                        Удалить
                     </Button>
                  )}
               </div>
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
         <Alert
            type='error'
            open={err}
            text='Не корректный файл'
            onClose={() => setErr(false)}
         />
         <Cropper
            open={!!url}
            onClose={() => setUrl('')}
            aspect={1}
            src={url}
            circularCrop={true}
            onSubmit={(event) => {
               event.canvas.current?.toBlob((blob) => {
                  if (blob === null) return

                  const file = new FormData()

                  file.append('image', blob)
                  setAvatar(file)
                  setUrl('')
               })
            }}
         />
      </>
   )
})

export default Avatar
