import { forwardRef, useState, ForwardedRef } from 'react'

import { InputProps } from 'ui/Input/index'
import OpenEyeSvg from 'assets/svg/OpenEyeSvg'
import CloseEyeSvg from 'assets/svg/CloseEyeSvg'

import style from '../Input.module.scss'

const InputText = forwardRef<HTMLInputElement, InputProps>(
   ({ error, className, ...otherProps }, ref: ForwardedRef<HTMLInputElement>) => {
      const [view, setView] = useState(false)

      return (
         <div className={`${error && style.error} ${style.inputPass} ${className}`}>
            <input
               ref={ref}
               type={view ? 'text' : 'password'}
               autoComplete='off'
               {...otherProps}
            />
            <button
               type='button'
               onClick={() => setView(!view)}
            >
               {view ? <CloseEyeSvg /> : <OpenEyeSvg />}
            </button>
         </div>
      )
   }
)

export default InputText
