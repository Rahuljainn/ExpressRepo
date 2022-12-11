import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '/config/config.env' })

//load model
import Bootcamp from './models/Bootcamp.js'

//coonect to DB
mongoose.connect(process.env.MONGO_URI)

//read JSON file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

//import into DB

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)

    console.log('Data imported...')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()

    console.log('Data Deleted...')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
