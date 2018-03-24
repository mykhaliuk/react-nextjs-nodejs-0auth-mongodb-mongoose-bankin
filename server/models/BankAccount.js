import mongoose from 'mongoose'
import User     from './User'

const ObjectsId = mongoose.Types.ObjectId
const BankAccountSchema = new mongoose.Schema({
  name        : {
    type    : String,
    required: true
  },
  currency    : {
    type   : String,
    default: 'EUR'
  },
  description : String,
  CreationDate: {
    type   : Date,
    default: Date.now
  },
  type        : {
    type   : String,
    default: 'Checking'
  }
})

class BankAccountClass {
  static async accountDataById(id) {
    const accountData = await this.findById(id)

    if (!accountData) {
      throw new Error('Not found')
    }

    return accountData
  }

  static async add({
    user_id,
    name,
    currency,
    description = null,
    CreationDate,
    type
  }) {
    const newAccount = await this.create({
      name,
      currency,
      description,
      CreationDate,
      type
    })

    const newAccount_id = newAccount._id

    await User.findOneAndUpdate({_id: ObjectsId(user_id)}, {'$push': {bankAccounts: newAccount_id}})

    return newAccount
  }
}

BankAccountSchema.loadClass(BankAccountClass)

/*BankAccountSchema.virtual('transactions', {
  ref         : 'Transaction',
  localField  : '_id',
  foreignField: 'account'
})*/

/*BankAccountSchema.set('toObject', {virtuals: true})
BankAccountSchema.set('toJSON', {virtuals: true})*/

export default mongoose.model('BankAccount', BankAccountSchema)
