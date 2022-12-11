import express from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamps,
  getBootcampsInRadius
} from '../controllers/bootcamps.js'

const router = express.Router()

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamps)

export default router
