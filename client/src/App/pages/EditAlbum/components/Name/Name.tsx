import { FC, useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import { useClickOut } from 'hooks/useClickOut'
import Button from 'ui/Button'
import Input from 'ui/Input'
import Loader from 'ui/Loader'
import PencilSvg from 'assets/svg/PencilSvg'

import style from './Name.module.scss'

const Name: FC = observer(() => {
   const [edit, setEdit] = useState(false)

   const formRef = useRef<HTMLFormElement | null>(null)
   const btnRef = useRef<HTMLButtonElement | null>(null)

   const {
      editAlbum: { album, loading, setName },
   } = useRootStore()

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: { name: '' },
      mode: 'onChange',
   })

   const submit = useCallback<(value: { name: string }) => Promise<void>>((value) => setName(album._id!, value), [])

   useClickOut(formRef, btnRef, () => setEdit(false))

   return (
      <div className={style.cntr}>
         <div className={`${style.name} ${edit && style.none}`}>
            <Button
               className={style.editBtn}
               design='default'
               ref={btnRef}
               onClick={() => {
                  setEdit(true)
                  reset({ name: album.name })
               }}
            >
               <PencilSvg />
            </Button>
            <p> {album.name} </p>
         </div>
         <form
            className={`${style.form} ${!edit && style.none}`}
            onSubmit={handleSubmit(submit)}
            ref={formRef}
         >
            <Input
               type='text'
               placeholder='Название альбома...'
               className={style.input}
               maxLength={50}
               error={!!errors.name}
               svg={loading.setName ? <Loader /> : undefined}
               {...register('name', {
                  required: true,
                  maxLength: 50,
                  minLength: 1,
                  validate: (val) => !(val.replace(/\s+/g, ' ').trim().length === 0)
               })}
            />
         </form>
      </div>
   )
})

export default Name
