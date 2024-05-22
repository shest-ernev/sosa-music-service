import { useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { PasswordEditValue } from 'store/ProfileStore/types'
import { useRootStore } from 'hooks/useRootStore'
import Input from 'ui/Input'
import Button from 'ui/Button'

import style from './Password.module.scss'

const Password = () => {
   const {
      profile: { loading, editPassword, res },
   } = useRootStore()

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         password: '',
         newPassword: '',
      },
      mode: 'onChange',
   })

   const submit = useCallback<(value: PasswordEditValue) => Promise<void>>((value) => editPassword(value), [])

   useEffect(() => {
      if (res === 'Пароль изменён') {
         reset({
            password: '',
            newPassword: '',
         })
      }
   }, [res])

   return (
      <form
         className={style.form}
         onSubmit={handleSubmit(submit)}
      >
         <div className={style.formTitle}>
            <p> Изменить пароль </p>
            <p> Введите новый пароль вашего аккаунта </p>
         </div>
         <Input
            type='password'
            className={style.input}
            placeholder='Введите новый пароль...'
            error={!!errors.newPassword}
            disabled={loading.editPassword}
            tabIndex={3}
            {...register('newPassword', {
               required: true,
               minLength: 7,
            })}
         />
         <p className={style.help}>
            {errors.newPassword?.type === 'required' && 'Обязательное поле'}
            {errors.newPassword?.type === 'minLength' && 'Минимум 7 символов'}
         </p>
         <Input
            type='password'
            className={style.input}
            placeholder='Введите пароль...'
            error={!!errors.password}
            disabled={loading.editPassword}
            tabIndex={4}
            {...register('password', { required: true })}
         />
         <p className={style.help}> {!!errors.password && 'Обязательное поле'} </p>
         <Button
            className={style.btn}
            type='submit'
            loading={loading.editPassword}
         >
            Изменить
         </Button>
      </form>
   )
}

export default Password
