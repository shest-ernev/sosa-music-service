import { forwardRef, ReactNode, ForwardedRef } from 'react'

import style from './Dropboard.module.scss'

export type ItemProps = {
   key: string | number
   text?: string
   icon?: ReactNode
   type?: 'text' | 'danger'
   className?: string
   onClick?: (() => void) | undefined
}

const Item = forwardRef<HTMLButtonElement, ItemProps>(
   (
      { onClick, icon, text, type, className }, 
      ref: ForwardedRef<HTMLButtonElement>
   ) => {
      return (
         <button
            className={`${style.item} ${style[type || 'text']} ${className}`}
            onClick={onClick}
            ref={ref}
            type='button'
         >
            {icon}
            <p> {text} </p>
         </button>
      )
   }
)

export default Item
