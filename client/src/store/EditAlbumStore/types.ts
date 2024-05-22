import { Album } from 'types/models/album'
import { Track } from 'types/models/track'
import { Artist } from 'store/CreateAlbumStore'

export type Loading = {
   get: boolean
   setName: boolean
   setPublished: boolean
   setCover: boolean
   addTrack: boolean
   delete: boolean
}

export type GetAlbum = {
   msg: string
   album: Album
   tracks: Track[]
}

export type SetCover = {
   msg: string
   cover: string
}

export type EditName = {
   msg: string
   name: string
}

export type CreateTrack = {
   name: string
   file: {
      name: string
      url: string
   }
   artists: Artist[]
   duration: number
}

export type CreateTrackReq = {
   msg: string
   track: Track
}
