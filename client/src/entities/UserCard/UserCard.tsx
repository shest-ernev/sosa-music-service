import { FC } from 'react'
import { Link } from 'react-router-dom'

import { User } from 'types/models/user'
import Dropboard from 'ui/Dropboard'
import Button from 'ui/Button'
import LikeSvg from 'assets/svg/LikeSvg'
import CopySvg from 'assets/svg/CopySvg'
import Avatar from '../../components/Avatar'

import style from './UserCard.module.scss'

type UserCardProps = Omit<User, 'admin' | 'cover' | 'likes' | '_id'> & {
   loading?: boolean
   onLike?: () => void
   onCopy?: () => void
}

const UserCard: FC<UserCardProps> = ({ name, login, avatar, loading, like, onLike, onCopy }) => {
   return (
      <div className={`${style.userCard} hover`}>
         <Link
            to={`/user/${login}/profile`}
            className={style.user}>
            <Avatar
               className={style.avatar}
               user={{ name, avatar }}
            />
            <div className={style.userText}>
               <p> {name} </p>
               <p> @{login} </p>
            </div>
         </Link>
         <div className={style.actions}>
            {like !== undefined && (
               <Button
                  className={`${style.like} ${like && style.likeActive}`}
                  onClick={onLike}
                  loading={loading}
                  design='default'>
                  <LikeSvg />
               </Button>
            )}
            <Dropboard
               className={style.dropboard}
               items={[
                  {
                     key: 0,
                     text: 'Скопировать ссылку',
                     icon: <CopySvg />,
                     onClick: () => {
                        navigator.clipboard.writeText(`${location.origin}/user/${login}.profile`)
                        onCopy ? onCopy() : undefined
                     },
                  },
               ]}
            />
         </div>
      </div>
   )
}

export default UserCard
