import { Album } from 'types/models/album'
import { User } from 'types/models/user'

export type CreateAlbum = {
   msg: string
   album: Pick<Album, '_id' | 'name' | 'cover' | 'published' | 'artists' | 'admin'>
}

export type Artist = Pick<Partial<User>, 'name' | '_id' | 'avatar' | 'login'>
