import mongoose, {Schema} from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name        : {
    type    : String,
    required: true,
    unique  : true
  },
  sub         : {
    type: Array
  },
  creationDate: {
    type   : Date,
    default: Date.now
  }
})

class CategoryClass {
  static async list() {
    return await this.find({}).exec()
  }
}

CategorySchema.loadClass(CategoryClass);

export default mongoose.model('Category', CategorySchema)