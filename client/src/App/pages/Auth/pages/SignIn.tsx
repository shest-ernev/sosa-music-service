import { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'

import { useRootStore } from 'hooks/useRootStore'
import { RequestSignInValue } from 'store/AuthStore'
import Input from 'ui/Input'
import Button from 'ui/Button'

import style from '../Auth.module.scss'

const SignIn: FC = observer(() => {
   const {
      auth: { loading, signIn, clearError },
   } = useRootStore()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         login: '',
         password: '',
      },
      mode: 'onChange',
   })

   const submit = useCallback<(value: RequestSignInValue) => Promise<void>>((value) => signIn(value), [])

   useEffect(() => {
      return () => clearError()
   }, [])

   return (
      <form
         className={style.form}
         onSubmit={handleSubmit(submit)}
      >
         <div className={style.formTitle}>
            <p> Войти </p>
            <p> Войдите в свой аккаунт </p>
         </div>
         <Input
            type='text'
            className={style.input}
            placeholder='Введите логин...'
            error={!!errors.login}
            tabIndex={1}
            {...register('login', { 
               required: true,
               validate: (val) => !(val.replace(/\s+/g, ' ').trim().length === 0) 
            })}
         />
         <p className={style.help}> {!!errors.login && 'Обязательное поле'} </p>
         <Input
            type='password'
            className={style.input}
            placeholder='Введите пароль...'
            error={!!errors.password}
            tabIndex={2}
            {...register('password', { required: true })}
         />
         <p className={style.help}> {!!errors.password && 'Обязательное поле'} </p>
         <Button
            className={style.btn}
            loading={loading}
            type='submit'
         >
            Войти
         </Button>
      </form>
   )
})

export default SignIn
