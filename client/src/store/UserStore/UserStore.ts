import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { User } from 'types/models/user'
import { Album } from 'types/models/album'
import { Track } from 'types/models/track'
import { GetUser, SetLike, Loading } from './types'
import api from 'config/api'
import axios from 'config/axios'

export default class UserStore {
   user: Omit<Partial<User>, 'admin'> = {}
   albums: Pick<Album, '_id' | 'name' | 'artists' | 'cover'>[] = []
   tracks: Track[] = []
   error: string = ''
   loading: Loading = {
      get: false,
      setLike: false,
   }

   constructor() {
      makeAutoObservable(this)
   }

   clearError = (): void => {
      this.error = ''
   }

   clear = (): void => {
      this.error = ''
      this.albums = []
      this.error = ''
   }

   getUser = async (login: string): Promise<void> => {
      try {
         this.loading.get = true

         const { data } = await axios.get<GetUser>(api.user.getUser(login))

         runInAction(() => {
            this.user = data.user
            this.albums = data.albums
            this.tracks = data.tracks
            this.loading.get = false
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.get = false

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
         this.loading.setLike = true

         const { data } = await axios.patch<SetLike>(api.user.setLike(id))

         runInAction(() => {
            this.loading.setLike = false
            this.user.like = data.like
            this.user.likes = data.likes
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.setLike = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   setLikeTrack = async (id: string): Promise<void> => {
      try {
         const item = this.tracks.find((obj) => obj._id === id)

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
            const item: any = this.tracks.find((obj: any) => obj._id === id)

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
