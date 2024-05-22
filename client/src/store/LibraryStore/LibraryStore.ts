import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { Track } from 'types/models/track'
import api from 'config/api'
import axios from 'config/axios'

export default class LibraryStore {
   tracks: Track[] = []
   loading: boolean = false
   error: string = ''

   constructor() {
      makeAutoObservable(this)
   }

   destroy = () => {
      this.tracks = []
      this.error = ''
   }

   getTracks = async (query?: string): Promise<void> => {
      try {
         this.loading = true

         const { data } = await axios.get(api.library.getTracks(query))

         runInAction(() => {
            this.loading = false
            this.tracks = data.items
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

   setLike = async (id: string): Promise<void> => {
      try {
         const item: any = this.tracks.find((obj) => obj._id === id)

         if (!item) {
            return
         }

         item.loading = true

         const { data } = await axios.patch(api.track.setLike(id))

         runInAction(() => {
            item.loading = false
            item.like = data.like
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            const item = this.tracks.find((obj) => obj._id === id)

            if (!item) {
               return
            }

            item.loading = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }
}
