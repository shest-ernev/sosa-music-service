import { useEffect } from 'react'

import { Album } from 'types/models/album'
import ListModel from 'store/ListModel'

type Albums = Pick<Album, '_id' | 'name' | 'artists' | 'cover'>

const albums = new ListModel<Albums>()

export const useLocalStore = () => {
   useEffect(() => {
      return albums.destroy()
   }, [])

   return albums
}
