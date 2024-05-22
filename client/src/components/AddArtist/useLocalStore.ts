import { useEffect } from 'react'

import ListModel from 'store/ListModel'
import { Artist } from 'store/CreateAlbumStore'

const artists = new ListModel<Artist>()

export const useLocalStore = (): ListModel<Artist> => {
   useEffect(() => {
      return () => {
         artists.setEnd(true)
         artists.clearItems()
         artists.setPage(0)
      }
   }, [])

   return artists
}
