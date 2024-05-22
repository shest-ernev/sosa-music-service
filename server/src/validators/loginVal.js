import { body } from 'express-validator'

export const loginVal = [
   body('login').isString(), 
   body('password').isString(),
]
