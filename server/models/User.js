import _                  from 'lodash'
import mongoose, {Schema} from 'mongoose'
import generateSlug       from '../utils/slugify'

const defaultCategories = {
  Incomes : {
    Salaries       : {name: "Salaries", icon: "LoginVariant", color: "#00cc8b"},
    Savings        : {name: "Savings", icon: "LoginVariant", color: "#00cc8b"},
    'Extra incomes': {name: "Extra incomes", icon: "LoginVariant", color: "#00cc8b"},
    group          : true
  },
  Expenses: {
    'Food & Dining'                 : {
      'Supermarket / Groceries': {name: "Supermarket / Groceries", icon: "FoodApple", color: "#ffb200"},
      'Food - others'          : {name: "Food - Others", icon: "FoodForkDrink", color: "#ffb200"},
      'Fast foods'             : {name: "Fast foods", icon: "Food", color: "#ffb200"},
      'Coffee Shop'            : {name: "Coffee Shop", icon: "Coffee", color: "#ffb200"},
      group                    : true,
      name                     : "Food & Dining",
      icon                     : "FoodCroissant",
      color                    : "#ffb200"
    },
    'Auto & Transport'              : {
      'Auto & Transport - others': {name: "Auto & Transport - Others", icon: "RoadVariant", color: "#00cbcb"},
      'Auto insurance'           : {name: "Auto insurance", icon: "Certificate", color: "#00cbcb"},
      'Car maintenance'          : {name: "Car maintenance", icon: "Wrench", color: "#00cbcb"},
      'Car washing'              : {name: "Car maintenance", icon: "CarWash", color: "#00cbcb"},
      'Gas & Fuel'               : {name: "Gas & Fuel", icon: "GasStation", color: "#00cbcb"},
      'Parking'                  : {name: "Parking", icon: "Parking", color: "#00cbcb"},
      'Public transport'         : {name: "Public transport", icon: "SubwayVariant", color: "#00cbcb"},
      'Plain'                    : {name: "Plain", icon: "Airplane", color: "#00cbcb"},
      'Tolls'                    : {name: "Tolls", icon: "Highway", color: "#00cbcb"},
      'Train tickets'            : {name: "Train tickets", icon: "Train", color: "#00cbcb"},
      group                      : true,
      name                       : "Auto & Transport",
      icon                       : "Steering",
      color                      : "#00cbcb"
    },
    Bank                            : {
      'Bank - Others'           : {name: "Bank - Others", icon: "Bitcoin", color: "#b78667"},
      'Banking fees and charges': {name: "Banking fees and charges", icon: "Percent", color: "#b78667"},
      'Banking services'        : {name: "Banking services", icon: "Margin", color: "#b78667"},
      'Monthly Debit'           : {name: "Monthly Debit", icon: "LogoutVariant", color: "#b78667"},
      'Mortgage refund'         : {name: "Mortgage refund", icon: "Finance", color: "#b78667"},
      'Savings'                 : {name: "Savings", icon: "TreasureChest", color: "#b78667"},
      group                     : true,
      name                      : "Bank",
      icon                      : "Bank",
      color                     : "#b78667"
    },
    'Bills & Utilities'             : {
      'Home phone'           : {name: "Home phone", icon: "Deskphone", color: "#c294c2"},
      'Cable TV'             : {name: "Cable TV", icon: "Television", color: "#c294c2"},
      'Internet'             : {name: "Internet", icon: "SignalVariant", color: "#c294c2"},
      'Mobile phone'         : {name: "Mobile phone", icon: "CellphoneIphone", color: "#c294c2"},
      'Subscription - Others': {name: "Subscription - Others", icon: "Sync", color: "#c294c2"},
      group                  : true,
      name                   : "Bills & Utilities",
      icon                   : "CellphoneAndroid",
      color                  : "#c294c2"
    },
    'Education & Children'          : {
      'Education & Children - Others': {name: "Education & Children - Others", icon: "HumanGreeting", color: "#F9B68A"},
      'Baby-sitter & Daycare'        : {name: "Baby-sitter & Daycare", icon: "LeadPencil", color: "#F9B68A"},
      'Pension'                      : {name: "Pension", icon: "LeadPencil", color: "#F9B68A"},
      'School supplies'              : {name: "School supplies", icon: "LeadPencil", color: "#F9B68A"},
      'Student loan'                 : {name: "Student loan", icon: "LeadPencil", color: "#F9B68A"},
      'Tuition'                      : {name: "Tuition", icon: "LeadPencil", color: "#F9B68A"},
      'Toys'                         : {name: "Toys", icon: "LeadPencil", color: "#F9B68A"},
      group                          : true,
      name                           : "Education & Children",
      icon                           : "LeadPencil",
      color                          : "#F9B68A"
    },
    Health                          : {
      'Health - Other'    : {name: "Health - Other", icon: "HeartPulse", color: "#FC5D6A"},
      Dentist             : {name: "Dentist", icon: "ToothOutline", color: "#FC5D6A"},
      Doctor              : {name: "Doctor", icon: "MedicalBag", color: "#FC5D6A"},
      'Health insurance'  : {name: "Health insurance", icon: "ClipboardPulseOutline", color: "#FC5D6A"},
      'Optician / Eyecare': {name: "Optician / Eyecare", icon: "EyeSettingsOutline", color: "#FC5D6A"},
      'Pharmacy'          : {name: "Pharmacy", icon: "Pill", color: "#FC5D6A"},
      group               : true,
      name                : "Health",
      icon                : "Hospital",
      color               : "#FC5D6A"
    },
    'Withdrawals, checks & transfer': {
      'Checks'           : {name: "Checks", icon: "Newspaper", color: "#19C95D"},
      'Internal transfer': {name: "Internal transfer", icon: "CreditCard", color: "#19C95D"},
      'Transfer'         : {name: "Transfer", icon: "SendSecure", color: "#19C95D"},
      'Withdrawals'      : {name: "Withdrawals", icon: "CashMultiple", color: "#19C95D"},
      name               : 'Withdrawals, checks & transfer',
      group              : true,
      icon               : "CreditCard",
      color              : "#19C95D"
    },
    'Misc expenses'                 : {
      'Insurance'             : {name: "Insurance", icon: "Umbrella", color: "#9FC3D3"},
      'Laundry / Dry cleaning': {name: "Laundry / Dry cleaning", icon: "WashingMachine", color: "#9FC3D3"},
      'Others spending'       : {name: "Others spending", icon: "CubeUnfolded", color: "#9FC3D3"},
      'Uncategorized'         : {name: "Uncategorized", icon: "CubeUnfolded", color: "#9FC3D3"},
      name                    : "Misc. expenses",
      group                   : true,
      icon                    : "React",
      color                   : "#9FC3D3"
    }
  }
}

const UserSchema = new Schema({
  googleId         : {
    type  : String,
    unique: true
  },
  googleToken      : {
    access_token : String,
    refresh_token: String
  },
  slug             : {
    type    : String,
    required: true,
    unique  : true
  },
  createdAt        : {
    type    : Date,
    required: true
  },
  email            : {
    type    : String,
    required: true,
    unique  : true
  },
  isAdmin          : {
    type   : Boolean,
    default: false
  },
  displayName      : String,
  avatarUrl        : String,
  githubAccessToken: {
    type: String
  },
  bankAccounts     : [{
    type: Schema.ObjectId,
    ref : 'BankAccount'
  }],
  categories       : Object,
  emailVerified    : Boolean
})

class UserClass {
  // User's public fields
  static publicFields() {
    return ['id', 'displayName', 'email', 'avatarUrl', 'slug', 'isAdmin', 'isGithubConnected', 'bankAccounts', 'emailVerified', 'categories']
  }

  static async signInOrSignUp({
    googleId, email, googleToken, displayName, avatarUrl, bankAccounts, emailVerified, categories = defaultCategories
  }) {
    const user = await this.findOne({googleId}).select(UserClass.publicFields().join(' '))

    if (user) {
      const modifier = {}

      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refreshToken
      }

      if (_.isEmpty(modifier)) {
        return user
      }

      await this.updateOne({googleId}, {$set: modifier})

      return user
    }

    const slug = await generateSlug(this, displayName)

    const newUser = await this.create({
      createdAt: new Date(),
      googleId,
      email,
      googleToken,
      displayName,
      slug,
      avatarUrl,
      bankAccounts,
      emailVerified,
      categories
    })

    return _.pick(newUser, UserClass.publicFields())
  }
}

const autoPopulateBankAccount = function (next) {
  this.populate('bankAccounts')
  next()
}

UserSchema.pre('findOne', autoPopulateBankAccount)
UserSchema.pre('find', autoPopulateBankAccount)

UserSchema.loadClass(UserClass)

const User = mongoose.model('User', UserSchema)

/*
//  uncomment to update categories
User.findOneAndUpdate({_id: mongoose.Types.ObjectId('5ab8023c7aed5e03a286020c')}, {categories: defaultCategories}, {new: true})
  .then(ctx => {console.log(ctx)})
  .catch(err => {console.log(err)})
*/

export default User
