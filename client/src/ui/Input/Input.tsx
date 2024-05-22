import { ReactNode, InputHTMLAttributes, forwardRef, ForwardedRef } from 'react'

import InputText from './components/InputText'
import InputPass from './components/InputPass'
import Checkbox from './components/Checkbox'
import InputRange from './components/InputRange'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
   type?: 'text' | 'password' | 'checkbox' | 'range'
   svg?: ReactNode
   error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, ...otherProps }, ref: ForwardedRef<HTMLInputElement>) => {
   if (type === 'text') {
      return (
         <InputText
            autoComplete='off'
            ref={ref}
            {...otherProps}
         />
      )
   }

   if (type === 'password') {
      return (
         <InputPass
            autoComplete='off'
            ref={ref}
            {...otherProps}
         />
      )
   }

   if (type == 'checkbox') {
      return (
         <Checkbox
            ref={ref}
            {...otherProps}
         />
      )
   }

   if (type === 'range') {
      return (
         <InputRange
            ref={ref} 
            {...otherProps} 
         />
      )
   }

   return (
      <InputText
         autoComplete='off'
         ref={ref}
         {...otherProps}
      />
   )
})

export default Input
