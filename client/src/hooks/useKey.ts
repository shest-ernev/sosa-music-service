import { useEffect } from 'react'


export const useKey = (
   key: string, 
   func: (event: KeyboardEvent) => void, 
   arr?: any[]
) => {
   useEffect(() => {
      const keyDown = (event: KeyboardEvent) => {
         if (event.key === key) {
            return func ? func(event) : undefined
         } else {
            return undefined
         }
      }

      document.addEventListener('keydown', keyDown)

      return () => document.removeEventListener('keydown', keyDown)
   }, arr || [])
}
