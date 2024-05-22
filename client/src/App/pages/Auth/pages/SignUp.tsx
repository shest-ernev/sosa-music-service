import { FC, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { RequestSignUpValue } from 'store/AuthStore'
import { useRootStore } from 'hooks/useRootStore'
import Input from 'ui/Input'
import Button from 'ui/Button'

import style from '../Auth.module.scss'

const SignUp: FC = observer(() => {
   const {
      auth: { loading, signUp, clearError },
   } = useRootStore()

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      defaultValues: {
         name: '',
         login: '',
         password: '',
         confirmPassword: '',
         agreement: false,
      },
      mode: 'onChange',
   })

   const submit = useCallback<(value: RequestSignUpValue) => Promise<void>>(
      (value) => signUp({
         name: value.name,
         login: value.login,
         password: value.password,
      }),
      []
   )

   useEffect(() => {
      return () => clearError()
   }, [])

   return (
      <form
         className={style.form}
         onSubmit={handleSubmit(submit)}
      >
         <div className={style.formTitle}>
            <p> Регистрация </p>
            <p> Создайте новый аккаунт </p>
         </div>
         <Input
            type='text'
            placeholder='Введите имя...'
            className={style.input}
            error={!!errors.name}
            maxLength={40}
            tabIndex={1}
            {...register('name', {
               required: true,
               minLength: 2,
               maxLength: 40,
               validate: (val) => !(val.replace(/\s+/g, ' ').trim().length === 0)
            })}
         />
         <p className={style.help}>
            {errors.name?.type === 'required' && 'Обязательное поле'}
            {errors.name?.type === 'maxLength' && 'Максимум 40 символов'}
            {errors.name?.type === 'validate' && 'Обязательное поле'}
            {errors.name?.type === 'minLength' && 'Минимум 2 символа'}
         </p>
         <Input
            type='text'
            className={style.input}
            placeholder='Введите логин...'
            maxLength={50}
            error={!!errors.login}
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
         <Input
            type='password'
            className={style.input}
            placeholder='Введите пароль...'
            error={!!errors.password}
            tabIndex={4}
            {...register('password', {
               required: true,
               minLength: 7,
            })}
         />
         <p className={style.help}>
            {errors.password?.type === 'required' && 'Обязательное поле'}
            {errors.password?.type === 'minLength' && 'Минимум 7 символов'}
         </p>
         <Input
            type='password'
            className={style.input}
            placeholder='Повторите пароль...'
            error={!!errors.confirmPassword}
            tabIndex={4}
            {...register('confirmPassword', {
               required: true,
               validate: (val) => {
                  if (watch('password') === val) {
                     return true
                  } else {
                     return false
                  }
               },
            })}
         />
         <p className={style.help}>
            {errors.confirmPassword?.type === 'required' && 'Обязательное поле'}
            {errors.confirmPassword?.type === 'validate' && 'Пароль не совпадает'}
         </p>
         <label className={style.agreement}>
            <Input
               type='checkbox'
               className={style.checkbox}
               error={!!errors.agreement}
               {...register('agreement', { required: true })}
            />
            <p>
               Я полностью соглашаюсь с{' '}
               <Link
                  to='/rules'
                  className='a'
               >
                  {' '}
                  условиями площадки{' '}
               </Link>
            </p>
         </label>
         <Button
            className={style.btn}
            type='submit'
            loading={loading}
         >
            Зарегитрироваться
         </Button>
      </form>
   )
})

export default SignUp
