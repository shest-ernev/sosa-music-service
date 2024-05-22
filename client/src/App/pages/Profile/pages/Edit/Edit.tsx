import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Helmet } from 'react-helmet'

import { useRootStore } from 'hooks/useRootStore'
import Alert from 'ui/Alert'
import PrevPage from 'components/PrevPage'
import Avatar from './components/Avatar'
import Cover from './components/Cover'
import Personal from './components/Personal'
import Password from './components/Password'

import style from './Edit.module.scss'

const Edit: FC = observer(() => {
   const {
      profile: { error, res, clearRes, clearError },
   } = useRootStore()

   return (
      <>
         <div className={style.edit}>
            <Helmet title='Редактировать профиль' />
            <PrevPage title='Редактировать профиль' />
            <div className={style.cntr}>
               <div className={style.visual}>
                  <Avatar />
                  <Cover />
               </div>
               <div className={style.personal}>
                  <Personal />
                  <Password />
               </div>
            </div>
         </div>
         <Alert
            type='error'
            open={!!error}
            text={error}
            onClose={() => clearError()}
         />
         <Alert
            open={!!res}
            text={res}
            onClose={() => clearRes()}
         />
      </>
   )
})

export default Edit
