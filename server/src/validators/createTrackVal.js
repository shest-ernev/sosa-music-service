import { body } from 'express-validator'

export const createTrackVal = [
   body('name').isString().isLength({ min: 1, max: 50 }),
   body('artists').isArray({ min: 1, max: 9 }),
   body('duration').isString(),
]
