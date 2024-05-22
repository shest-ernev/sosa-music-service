import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

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
app.use(express.static('public'))
app.use(cors())

mongoose
   .set('strictQuery', false)
   .connect('mongodb+srv://sosa:sosa2004@sosa.bh1ursi.mongodb.net/sosa')
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))

app.post('/auth/register', regVal, controllers.auth.reg)
app.post('/auth/login', loginVal, controllers.auth.login)
app.get('/auth/get', checkToken, controllers.auth.getAuth)

app.get('/profile', checkToken, controllers.profile.getProfile)
app.patch('/profile', checkToken, editDataVal, controllers.profile.editData)
app.patch('/profile/password', checkToken, editPassVal, controllers.profile.editPassword)
app.patch('/profile/avatar', checkToken, profileAvatar.single('image'), controllers.profile.setAvatar)
app.delete('/profile/avatar', checkToken, controllers.profile.delAvatar)
app.patch('/profile/cover', checkToken, profileCover.single('image'), controllers.profile.setCover)
app.delete('/profile/cover', checkToken, controllers.profile.delCover)

app.get('/users/all', controllers.user.getUsers)
app.patch('/user/like/:id', checkToken, controllers.user.setLike)
app.get('/user/:login', controllers.user.getUser)

app.get('/albums', controllers.album.getAlbums)
app.get('/album/:id', controllers.album.getAlbum)
app.get('/album/edit/:id', checkToken, checkAlbum, controllers.album.getEditAlbum)
app.post('/album', checkToken, albumCover.single('image'), createAlbumVal, controllers.album.createAlbum)
app.patch('/album/like/:id', checkToken, controllers.album.setLike)
app.patch('/album/cover/:id', checkToken, albumCover.single('image'), controllers.album.setCover)
app.patch('/album/name/:id', checkToken, controllers.album.setName)
app.patch('/album/status/:id', checkToken, checkAlbum, controllers.album.setStatus)
app.delete('/album/:id', checkToken, checkAlbum, controllers.album.deleteAlbum)

app.get('/tracks/all', controllers.track.getTracks)
app.post('/track/:id', checkToken, checkAlbum, track.single('audio'), controllers.track.addTrack)
app.delete('/track/:id', checkToken, controllers.track.delTrack)
app.patch('/track/like/:id', checkToken, controllers.track.setLike)

app.get('/library/tracks', checkToken, controllers.library.getTracks)
app.get('/library/users', checkToken, controllers.library.getUsers)
app.get('/library/albums', checkToken, controllers.library.getAlbums)

app.listen(8001, (err) => {
   if (err) {
      return console.log('Server error', err)
   } else {
      return console.log('Server started on https://localhost:8001')
   }
})
