import { FC } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'

import Button from 'ui/Button'
import ArrowLeftSvg from 'assets/svg/ArrowLeftSvg'

import style from './PrevPage.module.scss'

const PrevPage: FC<{ title: string }> = ({ title }) => {
   const navigate: NavigateFunction = useNavigate()

   return (
      <div className={style.prevPage}>
         <Button
            design='default'
            onClick={() => navigate(-1)}
         >
            <ArrowLeftSvg />
         </Button>
         <p> {title} </p>
      </div>
   )
}

export default PrevPage
