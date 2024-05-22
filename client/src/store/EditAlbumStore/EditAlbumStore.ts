import { makeAutoObservable, runInAction } from 'mobx'
import { isAxiosError } from 'axios'

import { Album } from 'types/models/album'
import { Track } from 'types/models/track'
import { Artist } from 'store/CreateAlbumStore'
import { Loading, GetAlbum, SetCover, EditName, CreateTrack, CreateTrackReq } from './types'
import api from 'config/api'
import axios from 'config/axios'

export default class EditAlbumStore {
   album: Partial<Album> = {}
   tracks: Omit<Track, 'like'>[] = []
   createTrack: CreateTrack = {
      name: '',
      file: {
         name: '',
         url: '',
      },
      artists: [],
      duration: 0,
   }
   error: string = ''
   res: string = ''
   loading: Loading = {
      get: false,
      setName: false,
      setPublished: false,
      addTrack: false,
      setCover: false,
      delete: false,
   }

   constructor() {
      makeAutoObservable(this)
   }

   clear = (): void => {
      this.album = {}
      this.tracks = []
      this.error = ''
      this.res = ''
   }

   setNameTrack = (value: string): void => {
      this.createTrack.name = value
   }

   setFile = (name: string, url: string): void => {
      this.createTrack.file.name = name
      this.createTrack.file.url = url
   }

   addArtists = (item: Artist): void => {
      if (this.createTrack.artists.length < 7) {
         this.createTrack.artists.push(item)
      }
   }

   delArtist = (id: string): void => {
      this.createTrack.artists = this.createTrack.artists.filter((obj) => obj._id !== id)
   }

   setDuration = (value: number): void => {
      this.createTrack.duration = value
   }

   clearError = (): void => {
      if (this.error !== 'Ошибка на сервере') {
         this.error = ''
      }
   }

   clearRes = (): void => {
      this.res = ''
   }

   setStatus = async (id: string, status: boolean) => {
      try {
         this.loading.setPublished = true

         const value = { status }

         const { data } = await axios.patch(api.album.setStatus(id), value)

         runInAction(() => {
            this.loading.setPublished = false
            this.album.published = data.status
            this.res = data.msg
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.setPublished = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   getAlbum = async (id: string) => {
      try {
         this.loading.get = true

         const { data } = await axios.get<GetAlbum>(api.album.getEditAlbum(id))

         runInAction(() => {
            this.loading.get = false
            this.album = data.album
            this.tracks = data.tracks.map((obj) => {
               const { like, ...other } = obj

               return other
            })
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

   setCover = async (id: string, file: FormData): Promise<void> => {
      try {
         this.loading.setCover = true

         const { data } = await axios.patch<SetCover>(api.album.setCover(id), file)

         runInAction(() => {
            this.loading.setCover = false
            this.album.cover = data.cover
            this.res = data.msg
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.setCover = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   setName = async (id: string, value: { name: string }): Promise<void> => {
      try {
         this.loading.setName = true

         const { data } = await axios.patch<EditName>(api.album.setName(id), value)

         runInAction(() => {
            this.loading.setName = false
            this.res = data.msg
            this.album.name = data.name
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.setName = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   addTrack = async (id: string, file: FormData, query: string) => {
      try {
         this.loading.addTrack = true

         const { data } = await axios.post<CreateTrackReq>(api.track.addTrack(id, query), file)

         console.log(data)

         runInAction(() => {
            this.loading.addTrack = false
            this.tracks.push(data.track)
            this.res = data.msg
            this.createTrack = {
               name: '',
               file: {
                  name: '',
                  url: '',
               },
               duration: 0,
               artists: [],
            }
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.addTrack = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }

   delTrack = async (id: string) => {
      try {
         const item = this.tracks.find((obj) => obj._id === id)

         if (!item) {
            return
         }

         item.loading = true

         const { data } = await axios.delete(api.track.delTrack(id))

         runInAction(() => {
            item.loading = false
            this.tracks = this.tracks.filter((obj) => obj._id !== id)
            this.res = data.msg
         })
      } catch (err) {
         const item = this.tracks.find((obj) => obj._id === id)

         if (!item) {
            return
         }

         runInAction(() => {
            item.loading = false
         })
      }
   }

   deleteAlbum = async (id: string) => {
      try {
         this.loading.delete = true

         await axios.delete(api.album.delAlbum(id))

         runInAction(() => {
            this.loading.delete = false
            this.res = 'Альбом удалён'
         })
      } catch (err) {
         console.log(err)

         runInAction(() => {
            this.loading.delete = false

            if (isAxiosError(err)) {
               this.error = err.response?.data.msg
            } else {
               this.error = 'Что-то пошло не так'
            }
         })
      }
   }
}
