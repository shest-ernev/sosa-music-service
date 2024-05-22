import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { User } from 'types/models/user'
import { Track } from 'types/models/track'
import { Loading, DataEditValue, PasswordEditValue, GetProfile, EditAvatar, EditCover, EditData, ProfileAlbums } from './types'
import api from 'config/api'
import axios from 'config/axios'

export default class ProfileStore {
   user: Omit<Partial<User>, 'like'> = {}
   albums: ProfileAlbums[] = []
   tracks: Track[] = []
   error: string = ''
   res: string = ''
   loading: Loading = {
      get: false,
      editAvatar: false,
      delAvatar: false,
      editCover: false,
      delCover: false,
      editData: false,
      editPassword: false,
   }

   constructor() {
      makeAutoObservable(this)
   }

   clearError = (): void => {
      this.error = ''
   }

   clearRes = (): void => {
      this.res = ''
   }

   clearUser = (): void => {
      this.user = {}
   }

   addAlbum = (album: ProfileAlbums) => {
      this.albums.unshift(album)
   }

   getProfile = async () => {
      try {
         this.loading.get = true

         const { data } = await axios.get<GetProfile>(api.profile.getProfile)

         runInAction(() => {
            this.loading.get = false
            this.user = data.user
            this.albums = data.albums
            this.tracks = data.tracks
         })

         return data.user
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

   setAvatar = async (file: FormData): Promise<void> => {
      try {
         this.loading.editAvatar = true

         const { data } = await axios.patch<EditAvatar>(api.profile.setAvatar, file)

         runInAction(() => {
            this.loading.editAvatar = false
            this.res = data.msg
            this.user.avatar = data.avatar
         })
      } catch (err) {
         runInAction(() => {
            this.loading.editAvatar = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   delAvatar = async (): Promise<void> => {
      try {
         this.loading.delAvatar = true

         const { data } = await axios.delete<Omit<EditAvatar, 'avatar'>>(api.profile.delAvatar)

         runInAction(() => {
            this.loading.delAvatar = false
            this.res = data.msg
            this.user.avatar = ''
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.delAvatar = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   setCover = async (file: FormData): Promise<void> => {
      try {
         this.loading.editCover = true

         const { data } = await axios.patch<EditCover>(api.profile.setCover, file)

         runInAction(() => {
            this.loading.editCover = false
            this.res = data.msg
            this.user.cover = data.cover
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.editCover = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   delCover = async (): Promise<void> => {
      try {
         this.loading.delCover = true

         const { data } = await axios.delete<Omit<EditCover, 'cover'>>(api.profile.delCover)

         runInAction(() => {
            runInAction(() => {
               this.loading.delCover = false
               this.res = data.msg
               this.user.cover = ''
            })
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.delCover = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   editData = async (value: DataEditValue): Promise<void> => {
      try {
         this.loading.editData = true

         const { data } = await axios.patch<EditData>(api.profile.editData, value)

         runInAction(() => {
            this.loading.editData = false
            this.user.name = data.user.name
            this.user.login = data.user.login
            this.res = data.msg
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.editData = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   editPassword = async (value: PasswordEditValue): Promise<void> => {
      try {
         this.loading.editPassword = true

         const { data } = await axios.patch<{ msg: string }>(api.profile.editPassword, value)

         runInAction(() => {
            this.loading.editPassword = false
            this.res = data.msg
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.editPassword = false

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
