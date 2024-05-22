import { FC, ForwardedRef, forwardRef } from 'react'
import TextareAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'

import style from './Textarea.module.scss'

const Textarea: FC<TextareaAutosizeProps> = forwardRef((
   {className, ...otherProps},
   ref: ForwardedRef<any>
) => {
   return (
      <div className={`${style.textarea} ${className}`}>
         <TextareAutosize 
            {...otherProps}
            ref={ref}
         />
      </div>
   )
})

export default Textarea
