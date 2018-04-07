import mongoose, {Schema} from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId
const ObjectID = mongoose.Types.ObjectId
const TransactionSchema = new mongoose.Schema({
  name        : {
    type    : String,
    required: true
  },
  note        : {
    type   : String,
    default: ''
  },
  owner       : {
    type    : ObjectId,
    required: true
  },
  account     : {
    type    : ObjectId,
    ref     : 'BankAccount',
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
    type    : Object,
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
    return await this.find({account: ObjectID(accountId)}).exec()
  }

  static async allTransactionsByUserId(userId) {
    return await this.find({owner: ObjectID(userId)}).sort('-creationDate').exec()
  }

  static async add({name, note, owner, account, amount, currency, category, creationDate, isHidden, icon}) {

    const newTransaction = await this.create({
      name,
      note,
      owner,
      account, amount,
      currency,
      category,
      creationDate,
      isHidden,
    })

    return newTransaction
  }
}

TransactionSchema.loadClass(TransactionClass)

export default mongoose.model('Transaction', TransactionSchema)