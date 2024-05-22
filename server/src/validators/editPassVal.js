import { body } from 'express-validator'

export const editPassVal = [
   body('newPassword').isString().isLength({ min: 7 }), 
   body('password').isString(),
]
