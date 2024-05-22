import { Album } from 'types/models/album'
import { Track } from 'types/models/track'

export type GetAlbum = {
   msg: string
   album: Omit<Album, 'admin'>
   tracks: Track[]
}

export type SetLike = {
   mag: string
   likes: number
   like: boolean
}
