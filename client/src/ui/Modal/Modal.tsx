import { FC, useEffect, ReactNode, MutableRefObject, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useClickOut } from 'hooks/useClickOut'
import { useKey } from 'hooks/useKey'
import CloseSvg from 'assets/svg/CloseSvg'
import Button from 'ui/Button'

import style from './Modal.module.scss'

type ModalProps = {
   open: boolean
   onClose: () => void
   title?: string
   onConfirm?: () => void
   onView?: () => void
   onUnView?: () => void
   btn: MutableRefObject<any>
   children?: ReactNode,
}

const Confirm: FC<ModalProps> = observer(({ 
   open, 
   onClose, 
   title, 
   onConfirm, 
   children, 
   onView, 
   onUnView, 
   btn 
}) => {
   const modalRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      if (open) {
         onView ? onView() : undefined
      } else {
         onUnView ? onUnView() : undefined
      }
   }, [open])

   useClickOut(modalRef, btn, onClose)
   useKey('Escape', onClose)

   return (
      <div className={`${style.cntr} ${open && style.open}`}>
         <div
            className={style.modal}
            ref={modalRef}
         >
            <div className={style.title}>
               <p> {title} </p>
               <button
                  className='hover'
                  onClick={onClose}
               >
                  <CloseSvg />
               </button>
            </div>
            <div className={style.content}>{children}</div>
            {!!onConfirm && (
               <Button
                  onClick={onConfirm}
                  className={style.confirm}
               >
                  Ок
               </Button>
            )}
         </div>
      </div>
   )
})

export default Confirm
