import mongoose, {Schema} from 'mongoose'

const ObjectsId = mongoose.Types.ObjectId
const TransactionSchema = new mongoose.Schema({
  name        : {
    type    : String,
    required: true
  },
  note        : String,
  owner       : {
    type    : ObjectId,
    required: true
  },
  account     : {
    type    : ObjectId,
    required: true
  },
  amount      : {
    type    : Number,
    required: true
  },
  currency    : {
    type   : String,
    default: 'EUR'
  },
  category    : {
    type    : ObjectId,
    required: true
  },
  subCategory : {
    type    : Number,
    required: true
  },
  creationDate: {
    type   : Date,
    default: Date.now
  },
  isHidden    : {
    type   : Boolean,
    default: false
  }
})

class TransactionClass {
  static async list({offset = 0, limit = 10} = {}) {
    const transactions = await this.find({})
      .sort({creationDate: -1})
      .skip(offset)
      .limit(limit)
    return {transactions}
  }

  static async allTransactionsByAccountId(accountId) {
    return await this.find({account: ObjectsId(accountId)}).exec()
  }
}

TransactionSchema.loadClass(TransactionClass)

export default mongoose.model('Transaction', TransactionSchema)