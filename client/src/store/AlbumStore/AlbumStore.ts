import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { Album } from 'types/models/album'
import { Track } from 'types/models/track'
import { GetAlbum, SetLike } from './types'
import axios from 'config/axios'
import api from 'config/api'

export default class AlbumStore {
   album: Omit<Partial<Album>, 'admin'> = {}
   tarcks: Track[] = []
   loading: boolean = false
   error: string = ''

   constructor() {
      makeAutoObservable(this)
   }

   clear = (): void => {
      this.album = {}
      this.tarcks = []
      this.error = ''
   }

   clearError = (): void => {
      this.error = ''
   }

   getAlbum = async (id: string): Promise<void> => {
      try {
         this.loading = true

         const { data } = await axios.get<GetAlbum>(api.album.getAlbum(id))

         runInAction(() => {
            this.loading = false
            this.album = data.album
            this.tarcks = data.tracks
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
         this.album.loading = true

         const { data } = await axios.patch<SetLike>(api.album.setLike(id))

         runInAction(() => {
            this.album.loading = false
            this.album.like = data.like
            this.album.likes = data.likes
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.album.loading = false

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
         const track = this.tarcks.find((obj) => obj._id === id)

         if (!track) {
            return
         }

         track.loading = true

         const { data } = await axios.patch<Omit<SetLike, 'likes'>>(api.track.setLike(id))

         runInAction(() => {
            track.loading = false
            track.like = data.like
         })
      } catch (err) {
         console.log(err)
         
         runInAction(() => {
            const track = this.tarcks.find((obj) => obj._id === id)

            if (!track) {
               return
            }

            track.loading = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }
}
