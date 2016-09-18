import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
})

export default mongoose.model('Node', nodeSchema)
