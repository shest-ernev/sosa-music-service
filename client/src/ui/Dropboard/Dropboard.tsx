import { useState, FC, ReactNode, useRef, MutableRefObject } from 'react'
import { observer } from 'mobx-react-lite'

import { useClickOut } from 'hooks/useClickOut'
import Button from 'ui/Button'
import DotsSvg from 'assets/svg/DotsSvg'
import Item from './Item'

import style from './Dropboard.module.scss'

type DropboardProps = {
   items?: {
      key: string | number
      text?: string
      icon?: ReactNode
      type?: 'text' | 'danger'
      ref?: MutableRefObject<any>
      className?: string
      onClick?: (() => void) | undefined
   }[]
   className?: string
}

const Dropboard: FC<DropboardProps> = observer(({ items, className }) => {
   const [open, setOpen] = useState<boolean>(false)

   const btnRef = useRef<HTMLButtonElement | null>(null)
   const menuRef = useRef<HTMLDivElement | null>(null)

   useClickOut(menuRef, btnRef, () => setOpen(false))

   return (
      <div className={`${style.cntr} ${className}`}>
         <Button
            type='button'
            design='default'
            className={style.btn}
            onClick={() => setOpen(!open)}
            ref={btnRef}
         >
            <DotsSvg />
         </Button>
         <div
            ref={menuRef}
            className={`${style.menu} ${open && style.menuOpen}`}
         >
            {items?.map((obj) => (
               <Item
                  key={obj.key}
                  className={obj.className}
                  onClick={() => {
                     setOpen(false)

                     obj.onClick ? obj.onClick() : undefined
                  }}
                  type={obj.type}
                  icon={obj.icon}
                  text={obj.text}
                  ref={obj.ref}
               />
            ))}
         </div>
      </div>
   )
})

export default Dropboard
