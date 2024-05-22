import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import axios from 'config/axios'

export default class ListModel<T> {
   items: T[] = []
   loading: boolean = false
   error: string = ''
   end: boolean = true
   page: number = 0

   constructor() {
      makeAutoObservable(this)
   }

   clearItems = (): void => {
      this.items = []
   }

   clearError = (): void => {
      this.error = ''
   }

   incPage = (): void => {
      this.page += 1
   }

   setPage = (value: number): void => {
      this.page = value
   }

   setEnd = (value: boolean): void => {
      this.end = value
   }

   getItems = async (path: string, limit?: number): Promise<void> => {
      try {
         const endLimit = limit || 30

         this.loading = true

         const { data } = await axios.get(path)

         runInAction(() => {
            this.loading = false
            this.items = this.items.concat(data.items)
            this.end = data.items.length < endLimit
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

   setLike = async (path: string, id: string): Promise<void> => {
      try {
         const item: any = this.items.find((obj: any) => obj._id === id)

         item.loading = true

         const { data } = await axios.patch(path)

         runInAction(() => {
            item.loading = false
            item.like = data.like
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            const item: any = this.items.find((obj: any) => obj._id === id)

            item.loading = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   searchReq = (path: string) => {
      this.setEnd(false)
      this.clearItems()
      this.incPage()
      this.getItems(path)
   }

   destroy = (): void => {
      this.setEnd(true)
      this.clearItems()
      this.setPage(0)
   }
}
