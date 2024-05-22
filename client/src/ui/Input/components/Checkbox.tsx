import { ForwardedRef, forwardRef } from 'react'

import { InputProps } from 'ui/Input/index'
import MarkerSvg from 'assets/svg/MarkerSvg'

import style from '../Input.module.scss'

const Checkbox = forwardRef<HTMLInputElement, InputProps>(
   ({ error, svg, className, ...otherProps }, ref: ForwardedRef<HTMLInputElement>) => (
      <label className={style.checkbox}>
         <input
            type='checkbox'
            className={style.checkboxInput}
            ref={ref}
            {...otherProps}
         />
         <span className={`${error && style.errorCheckbox} ${style.customCheckbox} ${className}`}>
            <MarkerSvg />
         </span>
      </label>
   )
)

export default Checkbox
