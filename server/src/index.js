import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { config } from './config.js'
import { regVal } from './validators/regVal.js'
import { loginVal } from './validators/loginVal.js'
import { editDataVal } from './validators/editDataVal.js'
import { editPassVal } from './validators/editPassVal.js'
import { createAlbumVal } from './validators/createAlbumVal.js'
import { profileAvatar, profileCover } from './middleware/profileUpload.js'
import { track } from './middleware/trackUpload.js'
import { albumCover } from './middleware/albumUpload.js' 
import controllers from './controllers/index.js'
import checkToken from './middleware/checkToken.js'
import checkAlbum from './middleware/checkAlbum.js'

const app = express()

app.use(express.json())
app.use('/api', express.static('public'))
app.use(cors())

mongoose
   .set('strictQuery', false)
   .connect(config.db)
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))

app.post('/api/auth/register', regVal, controllers.auth.reg)
app.post('/api/auth/login', loginVal, controllers.auth.login)
app.get('/api/auth/get', checkToken, controllers.auth.getAuth)

app.get('/api/profile', checkToken, controllers.profile.getProfile)
app.patch('/api/profile', checkToken, editDataVal, controllers.profile.editData)
app.patch('/api/profile/password', checkToken, editPassVal, controllers.profile.editPassword)
app.patch('/api/profile/avatar', checkToken, profileAvatar.single('image'), controllers.profile.setAvatar)
app.delete('/api/profile/avatar', checkToken, controllers.profile.delAvatar)
app.patch('/api/profile/cover', checkToken, profileCover.single('image'), controllers.profile.setCover)
app.delete('/api/profile/cover', checkToken, controllers.profile.delCover)

app.get('/api/users/all', controllers.user.getUsers)
app.patch('/api/user/like/:id', checkToken, controllers.user.setLike)
app.get('/api/user/:login', controllers.user.getUser)

app.get('/api/albums', controllers.album.getAlbums)
app.get('/api/album/:id', controllers.album.getAlbum)
app.get('/api/album/edit/:id', checkToken, checkAlbum, controllers.album.getEditAlbum)
app.post('/api/album', checkToken, albumCover.single('image'), createAlbumVal, controllers.album.createAlbum)
app.patch('/api/album/like/:id', checkToken, controllers.album.setLike)
app.patch('/api/album/cover/:id', checkToken, albumCover.single('image'), controllers.album.setCover)
app.patch('/api/album/name/:id', checkToken, controllers.album.setName)
app.patch('/api/album/status/:id', checkToken, checkAlbum, controllers.album.setStatus)
app.delete('/api/album/:id', checkToken, checkAlbum, controllers.album.deleteAlbum)

app.get('/api/tracks/all', controllers.track.getTracks)
app.post('/api/track/:id', checkToken, checkAlbum, track.single('audio'), controllers.track.addTrack)
app.delete('/api/track/:id', checkToken, controllers.track.delTrack)
app.patch('/api/track/like/:id', checkToken, controllers.track.setLike)

app.get('/api/library/tracks', checkToken, controllers.library.getTracks)
app.get('/api/library/users', checkToken, controllers.library.getUsers)
app.get('/api/library/albums', checkToken, controllers.library.getAlbums)

app.listen(config.port, (err) => {
   if (err) {
      return console.log('Server error', err)
   } else {
      return console.log('Server started')
   }
})
