import { body } from 'express-validator'


export const regVal = [
   body('name').isString().isLength({ min: 2, max: 40 }),
   body('login').isString().isLength({ min: 4, max: 50 }),
   body('password').isString().isLength({ min: 7 }),
]