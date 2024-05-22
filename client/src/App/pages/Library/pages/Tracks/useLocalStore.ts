import { useEffect } from 'react'
import LibraryStore from 'store/LibraryStore'

const library = new LibraryStore()

export const useLocalStore = (): LibraryStore => {
   useEffect(() => {
      return () => library.destroy()
   }, [])

   return library
}
