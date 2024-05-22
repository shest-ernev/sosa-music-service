import { useEffect } from 'react'

import { Track } from 'types/models/track'
import ListModel from 'store/ListModel'

const tracks = new ListModel<Track>()

export const useLocalStore = (): ListModel<Track> => {
   useEffect(() => {
      return () => tracks.destroy()
   }, [])

   return tracks
}