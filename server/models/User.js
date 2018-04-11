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
    'Food & Dining'    : {
      'Supermarket / Groceries': {name: "Supermarket / Groceries", icon: "FoodApple", color: "#ffb200"},
      'Food - others'          : {name: "Food - Others", icon: "FoodForkDrink", color: "#ffb200"},
      'Fast foods'             : {name: "Fast foods", icon: "Food", color: "#ffb200"},
      'Coffee Shop'            : {name: "Coffee Shop", icon: "Coffee", color: "#ffb200"},
      group                    : true,
      name                     : "Food & Dining",
      icon                     : "FoodCroissant",
      color                    : "#ffb200"
    },
    'Auto & Transport' : {
      'Auto & Transport - others': {name: "Auto & Transport - Others", icon: "RoadVariant", color: "#00cbcb"},
      'Auto insurance'           : {name: "Auto insurance", icon: "Certificate", color: "#00cbcb"},
      'Car maintenance'          : {name: "Car maintenance", icon: "Wrench", color: "#00cbcb"},
      'Car washing'              : {name: "Car washing", icon: "CarWash", color: "#00cbcb"},
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
    Bank               : {
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
    'Bills & Utilities': {
      'Home phone'           : {name: "Home phone", icon: "Deskphone", color: "#c294c2"},
      'Cable TV'             : {name: "Cable TV", icon: "Television", color: "#c294c2"},
      'Internet'             : {name: "Internet", icon: "AccessPoint", color: "#c294c2"},
      'Mobile phone'         : {name: "Mobile phone", icon: "CellphoneIphone", color: "#c294c2"},
      'Subscription - Others': {name: "Subscription - Others", icon: "Sync", color: "#c294c2"},
      group                  : true,
      name                   : "Bills & Utilities",
      icon                   : "CellphoneAndroid",
      color                  : "#c294c2"
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

//  uncomment to update categories
User.findOneAndUpdate({_id: mongoose.Types.ObjectId('5ab8023c7aed5e03a286020c')}, {categories: defaultCategories}, {new: true})
  .then(ctx => {console.log(ctx)})
  .catch(err => {console.log(err)})

export default User
