import { FC } from 'react'

import { User } from 'types/models/user'

import style from './Avatar.module.scss'

type AvatarProps = {
   className?: string
   user: Pick<Partial<User>, 'avatar' | 'name'>
}

const Avatar: FC<AvatarProps> = ({ user, className }) => {
   return (
      <div className={`${style.avatar} ${className}`}>
         {!!user.avatar ? <img src={user.avatar} /> : user.name?.charAt(0).toUpperCase()}
      </div>
   )
}

export default Avatar
