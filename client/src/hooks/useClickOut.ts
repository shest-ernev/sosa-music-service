import { useEffect, MutableRefObject } from 'react'

export const useClickOut = (
   modalRef?: MutableRefObject<any>,
   actionRef?: MutableRefObject<any> | undefined,
   cb?: () => void,
   arr?: any[]
): void => {
   useEffect(() => {
      const clickOut = (event: MouseEvent): void => {
         if (!event.composedPath().includes(modalRef?.current) && !event.composedPath().includes(actionRef?.current)) {
            cb ? cb() : undefined
         }
      }

      document.addEventListener('click', clickOut)

      return () => document.removeEventListener('click', clickOut)
   }, arr)
}
