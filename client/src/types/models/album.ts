import { User } from './user'

export type Album = {
   _id: string
   name: string
   cover: string
   genres: string[]
   artists: Pick<Partial<User>, 'name' | 'login' | 'avatar' | '_id'>[]
   year: number
   likes: number
   like?: boolean
   loading?: boolean
   published?: boolean
   admin?: boolean
}
