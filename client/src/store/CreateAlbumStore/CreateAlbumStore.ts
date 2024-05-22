import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { CreateAlbum, Artist } from './types'
import api from 'config/api'
import axios from 'config/axios'

export default class CreateAlbumStore {
   cover: string = ''
   name: string = ''
   selectGenres: string[] = []
   artists: Artist[] = []
   loading: boolean = false
   error: string = ''
   res: string = ''

   constructor() {
      makeAutoObservable(this)
   }

   setCover = (url: string): void => {
      this.cover = url
   }

   setName = (value: string): void => {
      this.name = value
   }

   addArtist = (artist: Artist): void => {
      if (this.artists.length < 7) {
         this.artists.push(artist)
      }
   }

   delArtist = (id: string): void => {
      this.artists = this.artists.filter((obj) => obj._id !== id)
   }

   addGenre = (item: string): void => {
      if (this.selectGenres.length < 3) {
         this.selectGenres.push(item)
      }
   }

   delGenre = (item: string) => {
      this.selectGenres = this.selectGenres.filter((el) => el !== item)
   }

   clearError = (): void => {
      this.error = ''
   }

   clearRes = (): void => {
      this.res = ''
   }

   createAlbum = async (query: string, file: FormData) => {
      try {
         this.loading = true

         const { data } = await axios.post<CreateAlbum>(api.album.create(query), file)

         runInAction(() => {
            this.loading = false
            this.res = data.msg
            this.name = ''
            this.artists = []
            this.selectGenres = []
            this.cover = ''
            URL.revokeObjectURL(this.cover)
         })

         return data.album
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
}
