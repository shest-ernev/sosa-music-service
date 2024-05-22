import ProfileStore from './ProfileStore'
import AuthStore from './AuthStore'
import FilterStore from './FilterStore'
import UserStore from './UserStore'
import CreateAlbumStore from './CreateAlbumStore'
import EditAlbumStore from './EditAlbumStore'
import PlayerStore from './PlayerStore'
import AlbumStore from './AlbumStore'

export default class RootStore {
   readonly auth = new AuthStore()
   readonly profile = new ProfileStore()
   readonly filter = new FilterStore()
   readonly user = new UserStore()
   readonly createAlbum = new CreateAlbumStore()
   readonly editAlbum = new EditAlbumStore()
   readonly player = new PlayerStore()
   readonly album = new AlbumStore()
}
