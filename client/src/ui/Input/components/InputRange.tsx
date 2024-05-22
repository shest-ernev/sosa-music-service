import { forwardRef } from 'react'

import { InputProps } from '../Input'

import style from '../Input.module.scss'

const InputRange = forwardRef<HTMLInputElement, InputProps>(({ className, max, value, ...otherProps }, ref) => {
   return (
      <div className={`${style.range} ${className}`}>
         <div className={style.lineCntr}>
            <div
               className={style.line}
               style={{ width: `${Number(value) / (Number(max) / 100)}%` }}
            />
         </div>
         <input
            type='range'
            max={max}
            ref={ref}
            value={value}
            {...otherProps}
         />
      </div>
   )
})

export default InputRange
