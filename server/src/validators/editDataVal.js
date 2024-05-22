import { body } from 'express-validator'

export const editDataVal = [
   body('name').isString().isLength({ min: 2, max: 40 }),
   body('login').isString().isLength({ min: 4, max: 50 }),
]
