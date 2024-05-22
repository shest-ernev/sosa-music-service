import { FC } from 'react'
import { Link } from 'react-router-dom'

import style from './TitleLink.module.scss'
import ArrowLeftSvg from 'assets/svg/ArrowLeftSvg'

type TitleLinkProps = {
   text: string
   to: string
   className?: string
}

const TitleLink: FC<TitleLinkProps> = ({ text, to, className }) => {
   return (
      <Link
         to={to} 
         className={`${style.titleLink} ${className}`}
      >
         <p> {text} </p>
         <ArrowLeftSvg />
      </Link>
   )
}

export default TitleLink
