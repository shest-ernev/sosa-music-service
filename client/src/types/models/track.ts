import { User } from './user'
import { Album } from './album'

export type Track = {
   _id: string
   album: Pick<Album, '_id' | 'cover'>
   name: string
   file: string
   artists: Pick<Partial<User>, 'name' | 'login' | 'avatar' | '_id'>[]
   duration: string
   like?: boolean
   loading?: boolean
}