import { Track } from 'types/models/track'
import { Album } from 'types/models/album'
import { User } from 'types/models/user'

export type Loading = {
   get: boolean
   editCover: boolean
   delCover: boolean
   editAvatar: boolean
   delAvatar: boolean
   editData: boolean
   editPassword: boolean
}

export type DataEditValue = {
   login?: string
   name?: string
}

export type PasswordEditValue = {
   password?: string
   newPassword?: string
}

export type GetProfile = {
   msg: string
   user: Omit<User, 'like' | 'loading'>
   albums: ProfileAlbums[]
   tracks: Track[]
}

export type EditAvatar = {
   msg: string
   avatar: string
}

export type EditCover = {
   msg: string
   cover: string
}

export type EditData = {
   msg: string
   user: {
      name: string
      login: string
   }
}

export type ProfileAlbums = Pick<Album, '_id' | 'name' | 'cover' | 'published' | 'artists' | 'admin'>
