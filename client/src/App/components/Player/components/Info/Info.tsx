import { FC } from 'react'
import { Link } from 'react-router-dom'

import { User } from 'types/models/user'
import MaximizeSvg from 'assets/svg/MaximizeSvg'
import Artists from 'components/Artists'

import style from './Info.module.scss'

type InfoProps = {
   cover: string
   _id: string
   name: string
   artists: Pick<Partial<User>, 'name' | 'login' | 'avatar' | '_id'>[]
   onClick: () => void
}

const Info: FC<InfoProps> = ({ cover,  _id, name, artists, onClick }) => {
   return (
      <div className={style.info}>
         <div className={style.cntr}>
            <button 
               className={style.cover}
               onClick={onClick}
            >
               <img src={cover} />
               <div className={style.maximize}>
                  <MaximizeSvg />
               </div>
            </button>
            <div className={style.infoText}>
               <Link
                  to={`/album/${_id}`}
                  className={style.name}
               >
                  {name}
               </Link>
               <Artists items={artists} />
            </div>
         </div>
      </div>
   )
}

export default Info
