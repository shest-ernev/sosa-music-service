import { FC } from 'react'

import style from './Loader.module.scss'

const Loader: FC<{ className?: string }> = ({ className }) => (
   <svg
      className={`${style.spinner} ${className}`}
      viewBox='0 0 50 50'
   >
      <circle
         className={style.path}
         cx='25'
         cy='25'
         r='20'
         strokeWidth='5'
      />
   </svg>
)

export default Loader
