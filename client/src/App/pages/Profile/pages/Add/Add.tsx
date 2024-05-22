import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Helmet } from 'react-helmet'
import qs from 'qs'

import { useRootStore } from 'hooks/useRootStore'
import { genres } from 'config/genres'
import PrevPage from 'components/PrevPage'
import Alert from 'ui/Alert'
import Button from 'ui/Button'
import Cover from './components/Cover'
import Artists from './components/Artists'
import Genre from './components/Genre'

import style from './Add.module.scss'

const Add: FC = observer(() => {
   const [error, setError] = useState<string>('')

   const {
      createAlbum,
      profile: { user, addAlbum },
   } = useRootStore()

   const submit = async (): Promise<void> => {
      if (createAlbum.cover === '') {
         return setError('Загрузите облложку')
      }

      if (createAlbum.name.replace(/\s+/g, ' ').trim().length === 0) {
         return setError('Введите название альбома')
      }

      if (createAlbum.selectGenres.length == 0) {
         return setError('Выберите жанр альбома')
      }

      const res = await fetch(createAlbum.cover).then((res) => res.blob())
      const file = new FormData()

      file.append('image', res)

      const query = qs.stringify({
         name: createAlbum.name,
         cover: createAlbum.cover,
         genres: createAlbum.selectGenres,
         artists: [
            {
               _id: user._id,
               avatar: user.avatar,
               name: user.name,
               login: user.login,
            },
            ...createAlbum.artists,
         ],
      })

      const album = await createAlbum.createAlbum(query, file)

      addAlbum(album!)
   }

   return (
      <>
         <div className={style.add}>
            <Helmet title='Добавить альбом' />
            <PrevPage title='Добавить альбом' />
            <div className={style.cntr}>
               <div className={style.albumPreview}>
                  <Cover />
                  <div className={style.albumText}>
                     <input
                        type='text'
                        className={style.albumName}
                        maxLength={50}
                        placeholder='Название альбома'
                        autoComplete='off'
                        onChange={(event) => createAlbum.setName(event.target.value)}
                     />
                     <Artists />
                  </div>
               </div>
               <div className={style.genreSelect}>
                  <h2> Выберите 1-3 жанров </h2>
                  <div className={style.genres}>
                     {genres.map((item) => (
                        <Genre
                           key={item}
                           item={item}
                           select={createAlbum.selectGenres.includes(item)}
                           onCheck={() => createAlbum.addGenre(item)}
                           onUnCheck={() => createAlbum.delGenre(item)}
                        />
                     ))}
                  </div>
               </div>
               <Button
                  className={style.btn}
                  onClick={submit}
                  loading={createAlbum.loading}
               >
                  Сохранить
               </Button>
            </div>
         </div>
         <Alert
            type='error'
            open={!!error || !!createAlbum.error}
            onClose={() => {
               setError('')
               createAlbum.clearError()
            }}
            text={error || createAlbum.error}
         />
         <Alert
            open={!!createAlbum.res}
            onClose={() => createAlbum.clearRes()}
            text={createAlbum.res}
         />
      </>
   )
})

export default Add
