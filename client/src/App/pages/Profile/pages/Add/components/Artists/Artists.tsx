import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'hooks/useRootStore'
import ArtistItem from 'components/ArtistItem'
import AddArtist from 'components/AddArtist'

import style from './Artists.module.scss'

const Artists: FC = observer(() => {
   const {
      profile: { user },
      createAlbum: { artists, addArtist, delArtist },
   } = useRootStore()

   return (
      <>
         <div className={style.artists}>
            <ArtistItem
               avatar={user.avatar}
               name={user.name}
            />
            {artists.map((obj) => (
               <ArtistItem
                  key={obj._id}
                  avatar={obj.avatar}
                  name={obj.name}
                  onDelete={() => delArtist(obj._id)}
               />
            ))}
            <AddArtist
               arr={artists}
               onDel={(artist) => delArtist(artist._id)}
               className={style.addInput}
               onAdd={(artist) => {
                  if (artist._id === user._id) return

                  addArtist(artist)
               }}
            />
         </div>
      </>
   )
})

export default Artists
