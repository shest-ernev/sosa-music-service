import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import { useFormatNumber } from 'hooks/useFormatNumber'
import ArtistItem from 'components/ArtistItem'
import Button from 'ui/Button'
import PlaySvg from 'assets/svg/PlaySvg'
import LikeSvg from 'assets/svg/LikeSvg'
import Loader from 'ui/Loader'
import Dropboard from 'ui/Dropboard'
import CopySvg from 'assets/svg/CopySvg'
import Alert from 'ui/Alert'

import style from './Info.module.scss'

const Info: FC = observer(() => {
   const [copy, setCopy] = useState<string>('')

   const {
      album: { album, tarcks, setLike },
      player: { start }
   } = useRootStore()

   return (
      <>
         <div className={style.info}>
            <img 
               src={album.cover}
               className={style.cover}
            />
            <div className={style.infoText}>
               <p className={style.genres}> {album.year} · {album.genres?.join(' · ')} </p>
               <p className={style.name}> {album.name} </p>
               <div className={style.artists}>
                  {album.artists?.map((obj) => (
                     <ArtistItem 
                        key={obj._id}
                        avatar={obj.avatar}
                        name={obj.name}
                        login={obj.login}
                     />
                  ))}
               </div>
               <div className={style.actions}>
                  <Button
                     className={style.play}
                     onClick={() => start(0, tarcks)}
                  >
                     <PlaySvg />
                     <p> Слушать </p>
                  </Button>
                  <Button
                     className={`${style.like} ${album.like && style.likeActive}`}
                     design='default'
                     disabled={album.like === undefined}
                     onClick={() => {
                        if (!!album._id) {
                           setLike(album._id)
                        }
                     }}
                  >
                     <p> {album.likes !== undefined && useFormatNumber(album.likes)} </p>
                     {album.loading ? <Loader /> : <LikeSvg />}
                  </Button>
                  <Dropboard 
                     className={style.dropboard}
                     items={[
                        {
                           key: 0,
                           text: 'Скопировать ссылку',
                           icon: <CopySvg />,
                           onClick: () => {
                              navigator.clipboard.writeText(location.href)
                              setCopy('Ссылка скопирована')
                           }
                        }
                     ]}
                  />
               </div>
            </div>
         </div>
         <Alert 
            type='text'
            open={!!copy}
            onClose={() => setCopy('')}
            text={copy}
         />
      </>
   )
})

export default Info
