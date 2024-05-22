import { FC, useEffect, useState } from 'react'

import OkSvg from 'assets/svg/OkSvg'
import ErrorSvg from 'assets/svg/ErrorSvg'

import style from './Alert.module.scss'

type AlertProps = {
   type?: 'error' | 'text'
   text?: string
   open?: boolean
   className?: string
   onClose: () => void
}

const Alert: FC<AlertProps> = ({ type, text, open, className, onClose }) => {
   const [defaultText, setDefaultText] = useState<string | undefined>('')

   useEffect(() => {
      if (text !== '') {
         setDefaultText(text)
      }
   }, [text])

   useEffect(() => {
      const timeOut: NodeJS.Timeout = setTimeout(onClose, 2000)

      if (!open) {
         clearTimeout(timeOut)
      }
   }, [open])

   return (
      <div className={`${style.cntr} ${open && style.open} ${className}`}>
         <div className={`${style.alert} ${style[type || 'text']}`}>
            <p> {defaultText} </p>
            {type === 'error' ? <ErrorSvg /> : <OkSvg />}
         </div>
      </div>
   )
}

export default Alert
