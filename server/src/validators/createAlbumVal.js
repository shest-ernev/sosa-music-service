import { body } from 'express-validator'

export const createAlbumVal = [
   body('name').isString().isLength({ min: 1, max: 50 }),
   body('artists').isArray({ min: 1, max: 7 }),
   body('genres').isArray({ min: 1, max: 3 })
]