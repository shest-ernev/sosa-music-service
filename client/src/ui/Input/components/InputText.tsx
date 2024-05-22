import { forwardRef, ForwardedRef } from 'react'

import { InputProps } from '../Input'

import style from '../Input.module.scss'

const InputText = forwardRef<HTMLInputElement, InputProps>(
   ({ error, svg, className, ...otherProps }, ref: ForwardedRef<HTMLInputElement>) => (
      <div className={`${style.inputText} ${!!svg && style.svg} ${className} ${error && style.error}`}>
         {svg}
         <input
            ref={ref}
            {...otherProps}
         />
      </div>
   )
)

export default InputText
