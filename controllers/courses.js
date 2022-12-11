import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/async.js'
import Course from '../models/Course.js'
import Bootcamp from '../models/Bootcamp.js'

// Get all course
// GET /api/v1/courses
// GET /api/v1/bootcamps/:botcampId/courses
// public
const getCourses = asyncHandler(async (req, res, next) => {
  let query

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId })
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    })
  }

  const courses = await query

  res.status(200).json({
    sucess: true,
    count: courses.length,
    data: courses
  })
})

// Get single course
// GET /api/v1/courses/:id
// public
const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  })

  if (!course) {
    return next(new ErrorResponse(`No course with id of ${req.params.id}`), 404)
  }

  res.status(200).json({
    sucess: true,
    data: course
  })
})

// Add single course
// POST /api/v1/bootcamps/:bootcampId/courses
// private
const addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId

  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp found with the id of ${req.params.bootcampId}`,
        404
      )
    )
  }

  const course = await Course.create(req.body)

  res.status(200).json({
    success: true,
    data: course
  })
})

// Update single course
// PUT /api/v1/courses/:Id
// private
const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    )
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: course
  })
})

// Delete single course
// DELETE /api/v1/courses/:Id
// private
const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    )
  }

  await course.remove()

  res.status(200).json({
    success: true,
    data: {}
  })
})

export { getCourses, getCourse, addCourse, updateCourse, deleteCourse }
