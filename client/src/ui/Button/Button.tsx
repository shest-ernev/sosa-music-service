import { forwardRef, ButtonHTMLAttributes, ForwardedRef } from 'react'

import Loader from '../Loader'

import style from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   design?: 'main' | 'default' | 'danger'
   loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      { loading, children, className, design, disabled, ...otherProps }, 
      ref: ForwardedRef<HTMLButtonElement>
   ) => {
      return (
         <button
            className={`${style[design || 'main']} ${className}`}
            disabled={loading || disabled}
            ref={ref}
            {...otherProps}
         >
            {loading ? <Loader className={style.loader} /> : <> {children} </>}
         </button>
      )
   }
)

export default Button
