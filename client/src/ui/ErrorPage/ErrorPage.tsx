import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowLeftSvg from 'assets/svg/ArrowLeftSvg'
import Button from 'ui/Button'

import style from './ErrorPage.module.scss'

const ErrorPage: FC<{ msg: string }> = ({ msg }) => {
   const navigate = useNavigate()

   return (
      <div className={style.pageError}>
         <Button
            className={style.prev}
            onClick={() => navigate(-1)}
            design='default'
         >
            <ArrowLeftSvg />
            <p> Назад </p>
         </Button>
         <span />
         <p className={style.msg}> 🤷‍♂️ {msg} </p>
      </div>
   )
}

export default ErrorPage
