import { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import CartSvg from 'assets/svg/CartSvg'
import MarkerSvg from 'assets/svg/MarkerSvg'
import CloseSvg from 'assets/svg/CloseSvg'
import Button from 'ui/Button'
import Modal from 'ui/Modal'

import style from './Actions.module.scss'

const Actions: FC = observer(() => {
   const [del, setDel] = useState<boolean>(false)

   const navigate = useNavigate()

   const {
      editAlbum: { album, loading, setStatus, deleteAlbum, res },
   } = useRootStore()

   const delRef = useRef<HTMLButtonElement | null>(null)

   useEffect(() => {
      if (res === 'Альбом удалён') {
         navigate('/profile/me')
      }
   }, [res])

   return (
      <>
         <div className={`${style.actions} ${style.add}`}>
            <Button
               className={style.btn}
               design='default'
               loading={loading.setPublished}
               onClick={() => {
                  if (!album._id) {
                     return
                  }

                  setStatus(album._id, !album.published)
               }}
            >
               {album.published ? <CloseSvg /> : <MarkerSvg />}
               <p> {album.published ? 'Скрыть' : 'Опубликовать'} </p>
            </Button>
            <Button
               className={style.del}
               design='danger'
               onClick={() => setDel(true)}
               ref={delRef}
            >
               <CartSvg />
               <p> Удалить </p>
            </Button>
         </div>
         <Modal
            title='Подтверждение'
            open={del}
            onClose={() => setDel(false)}
            btn={delRef}
         >
            <div className={style.modal}>
               <p className={style.confirm}> Вы действительно хотите удалить альбом без возможности востановления? </p>
               <div className={style.modalBtns}>
                  <Button
                     className={style.confirmBtn}
                     loading={loading.delete}
                     onClick={() => {
                        if (album._id !== undefined) {
                           deleteAlbum(album._id)
                        }
                     }}
                  > 
                     Удалить
                  </Button>
               </div>
            </div>
         </Modal>
      </>
   )
})

export default Actions
