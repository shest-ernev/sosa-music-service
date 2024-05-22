import { FC } from 'react'

import Input from 'ui/Input'

import style from './Genre.module.scss'

type GenreProps = {
   item: string
   select: boolean
   onCheck: () => void
   onUnCheck: () => void
}

const Genre: FC<GenreProps> = ({ item, select, onCheck, onUnCheck }) => {
   return (
      <label className={style.item}>
         <Input 
            type='checkbox'
            className={style.checkbox}
            checked={select}
            onChange={(event) => {
               if (event.target.checked) {
                  onCheck()
               } else {
                  onUnCheck()
               }
            }}
         />
         <p> {item} </p>
      </label>
   )
}

export default Genre
