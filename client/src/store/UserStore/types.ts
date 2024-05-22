import { Track } from 'types/models/track';
import { User } from 'types/models/user'
import { Album } from 'types/models/album'

export type Loading = {
   get: boolean
   setLike: boolean
}

export type SetLike = {
   msg: string
   like: boolean
   likes: number
}

export type GetUser = {
   msg: string
   user: Omit<Partial<User>, 'admin'>
   albums: Pick<Album, '_id' | 'name' | 'artists' | 'cover'>[]
   tracks: Track[]
}
