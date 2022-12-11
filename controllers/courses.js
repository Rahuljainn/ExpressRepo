import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/async.js'
import Course from '../models/Course.js'

// GET /api/v1/courses
// GET /api/v1/bootcamps/:botcampId/courses
// public
const getCourses = asyncHandler(async (req, res, next) => {
  let query

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId })
  } else {
    query = Course.find()
  }

  const courses = await query

  res.status(200).json({
    sucess: true,
    count: courses.length,
    data: courses
  })
})

export default getCourses
