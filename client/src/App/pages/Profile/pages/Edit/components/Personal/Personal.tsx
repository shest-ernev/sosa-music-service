import { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import { DataEditValue } from 'store/ProfileStore'
import Input from 'ui/Input'
import Button from 'ui/Button'

import style from './Personal.module.scss'

const Personal: FC = observer(() => {
   const {
      profile: { user, loading, editData },
   } = useRootStore()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         name: user.name,
         login: user.login,
      },
      mode: 'onChange',
   })

   const submit = useCallback<(value: DataEditValue) => Promise<void>>((value) => editData(value), [])

   return (
      <form
         className={style.form}
         onSubmit={handleSubmit(submit)}
      >
         <div className={style.formTitle}>
            <p> Персональные данные </p>
            <p> Введите новые данные профиля </p>
         </div>
         <Input
            type='text'
            placeholder='Введите имя...'
            className={style.input}
            error={!!errors.name}
            maxLength={40}
            disabled={loading.editData}
            tabIndex={1}
            {...register('name', {
               required: true,
               minLength: 2,
               maxLength: 40,
               validate: (val) => !(val?.replace(/\s+/g, ' ').trim().length === 0),
            })}
         />
         <p className={style.help}>
            {errors.name?.type === 'required' && 'Обязательное поле'}
            {errors.name?.type === 'validate' && 'Обязательное поле'}
            {errors.name?.type === 'minLength' && 'Минимум 2 символа'}
            {errors.name?.type === 'maxLength' && 'Максимум 40 символов'}
         </p>
         <Input
            type='text'
            className={style.input}
            placeholder='Введите логин...'
            maxLength={50}
            error={!!errors.login}
            disabled={loading.editData}
            tabIndex={2}
            {...register('login', {
               required: true,
               minLength: 4,
               maxLength: 50,
               pattern: /^[A-Za-z0-9_-]+$/g,
            })}
         />
         <p className={style.help}>
            {errors.login?.type === 'required' && 'Обязательное поле'}
            {errors.login?.type === 'minLength' && 'Минимум 4 символа'}
            {errors.login?.type === 'maxLength' && 'Максимум 50 символов'}
            {errors.login?.type === 'pattern' && 'Только латиница, числа, "-", "_", без пробелов'}
         </p>
         <Button
            className={style.btn}
            loading={loading.editData}
            type='submit'
         >
            Изменить
         </Button>
      </form>
   )
})

export default Personal
