import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { RequestSignInValue, RequestSignUpValue, AuthRes } from './types'
import api from 'config/api'
import axios from 'config/axios'

export default class AuthStore {
   auth: boolean = !!localStorage.getItem('token')
   loading: boolean = false
   error: string = ''

   constructor() {
      makeAutoObservable(this)
   }

   clearError = (): void => {
      this.error = ''
   }

   logOut = (): void => {
      this.auth = false
      localStorage.removeItem('token')
   }

   signIn = async (value: RequestSignInValue): Promise<void> => {
      try {
         this.loading = true

         const { data } = await axios.post<AuthRes>(api.auth.signIn, value)

         runInAction(() => {
            this.loading = false
            this.auth = true
            localStorage.setItem('token', data.token)
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   signUp = async (value: RequestSignUpValue): Promise<void> => {
      try {
         this.loading = true

         const { data } = await axios.post<AuthRes>(api.auth.singUp, value)

         runInAction(() => {
            this.loading = false
            this.auth = true
            localStorage.setItem('token', data.token)
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   getAuth = async (): Promise<void> => {
      try {
         await axios.get<Omit<AuthRes, 'token'>>(api.auth.getAuth)
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.auth = false
            localStorage.removeItem('token')
         })
      }
   }
}
