import createAlbum from './handlers/createAlbum.js'
import deleteAlbum from './handlers/deleteAlbum.js'
import getAlbum from './handlers/getAlbum.js'
import getAlbums from './handlers/getAlbums.js'
import getEditAlbum from './handlers/getEditAlbum.js'
import setCover from './handlers/setCover.js'
import setLike from './handlers/setLike.js'
import setName from './handlers/setName.js'
import setStatus from './handlers/setStatus.js'

const album = {
   createAlbum,
   getAlbum,
   setCover,
   setLike,
   setName,
   setStatus,
   getAlbums,
   getEditAlbum,
   deleteAlbum,
}

export default album
