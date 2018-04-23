import _                    from 'lodash'
import mongoose, { Schema } from 'mongoose'
import generateSlug         from '../utils/slugify'
import { faCheckSquare }    from '@fortawesome/free-solid-svg-icons/index'

const defaultCategories = {
  Incomes : {
    Salaries       : {name: "Salaries", icon: "sign-in-alt", color: "#00cc8b"},
    Savings        : {name: "Savings", icon: "sign-in-alt", color: "#00cc8b"},
    'Extra incomes': {name: "Extra incomes", icon: "sign-in-alt", color: "#00cc8b"},
    group          : true
  },
  Expenses: {
    'Food & Dining'                 : {
      'Supermarket / Groceries': {name: "Supermarket / Groceries", icon: "shopping-basket", color: "#ffb200"},
      'Food - others'          : {name: "Food - Others", icon: "lemon", color: "#ffb200"},
      'Fast foods'             : {name: "Fast foods", icon: "poo", color: "#ffb200"},
      'Coffee Shop'            : {name: "Coffee Shop", icon: "coffee", color: "#ffb200"},
      group                    : true,
      name                     : "Food & Dining",
      icon                     : "utensils",
      color                    : "#ffb200"
    },
    'Auto & Transport'              : {
      'Auto & Transport - others': {name: "Auto & Transport - Others", icon: "taxi", color: "#00cbcb"},
      'Auto insurance'           : {name: "Auto insurance", icon: "shield-alt", color: "#00cbcb"},
      'Car maintenance'          : {name: "Car maintenance", icon: "wrench", color: "#00cbcb"},
      'Car washing'              : {name: "Car washing", icon: "warehouse", color: "#00cbcb"},
      'Gas & Fuel'               : {name: "Gas & Fuel", icon: "fire", color: "#00cbcb"},
      'Parking'                  : {name: "Parking", icon: "flag-checkered", color: "#00cbcb"},
      'Public transport'         : {name: "Public transport", icon: "bus", color: "#00cbcb"},
      'Plain'                    : {name: "Plain", icon: "plane", color: "#00cbcb"},
      'Tolls'                    : {name: "Tolls", icon: "road", color: "#00cbcb"},
      'Train tickets'            : {name: "Train tickets", icon: "train", color: "#00cbcb"},
      group                      : true,
      name                       : "Auto & Transport",
      icon                       : "car",
      color                      : "#00cbcb"
    },
    Bank                            : {
      'Bank - Others'           : {name: "Bank - Others", icon: "credit-card", color: "#b78667"},
      'Banking fees and charges': {name: "Banking fees and charges", icon: "gavel", color: "#b78667"},
      'Banking services'        : {name: "Banking services", icon: "percent", color: "#b78667"},
      'Monthly Debit'           : {name: "Monthly Debit", icon: "chart-line", color: "#b78667"},
      'Mortgage refund'         : {name: "Mortgage refund", icon: "exchange-alt", color: "#b78667"},
      'Savings'                 : {name: "Savings", icon: "piggy-bank", color: "#b78667"},
      group                     : true,
      name                      : "Bank",
      icon                      : "university",
      color                     : "#b78667"
    },
    'Bills & Utilities'             : {
      'Home phone'           : {name: "Home phone", icon: "phone-square", color: "#c294c2"},
      'Cable TV'             : {name: "Cable TV", icon: "tv", color: "#c294c2"},
      'Internet'             : {name: "Internet", icon: "wifi", color: "#c294c2"},
      'Mobile phone'         : {name: "Mobile phone", icon: "mobile-alt", color: "#c294c2"},
      'Subscription - Others': {name: "Subscription - Others", icon: "sync-alt", color: "#c294c2"},
      group                  : true,
      name                   : "Bills & Utilities",
      icon                   : "chart-bar",
      color                  : "#c294c2"
    },
    'Education & Children'          : {
      'Education & Children - Others': {name: "Education & Children - Others", icon: "graduation-cap", color: "#F9B68A"},
      'Baby-sitter & Daycare'        : {name: "Baby-sitter & Daycare", icon: "child", color: "#F9B68A"},
      'Pension'                      : {name: "Pension", icon: "pencil-alt", color: "#F9B68A"},
      'School supplies'              : {name: "School supplies", icon: "pencil-alt", color: "#F9B68A"},
      'Student loan'                 : {name: "Student loan", icon: "building", color: "#F9B68A"},
      'Tuition'                      : {name: "Tuition", icon: "pencil-alt", color: "#F9B68A"},
      'Toys'                         : {name: "Toys", icon: "fighter-jet", color: "#F9B68A"},
      group                          : true,
      name                           : "Education & Children",
      icon                           : "graduation-cap",
      color                          : "#F9B68A"
    },
    Health                          : {
      'Health - Other'    : {name: "Health - Other", icon: "hand-holding-heart", color: "#FC5D6A"},
      Dentist             : {name: "Dentist", icon: "user-md", color: "#FC5D6A"},
      Doctor              : {name: "Doctor", icon: "medkit", color: "#FC5D6A"},
      'Health insurance'  : {name: "Health insurance", icon: "notes-medical", color: "#FC5D6A"},
      'Optician / Eyecare': {name: "Optician / Eyecare", icon: "eye", color: "#FC5D6A"},
      'Pharmacy'          : {name: "Pharmacy", icon: "capsules", color: "#FC5D6A"},
      group               : true,
      name                : "Health",
      icon                : "heartbeat",
      color               : "#FC5D6A"
    },
    'Withdrawals, checks & transfer': {
      'Checks'           : {name: "Checks", icon: "ticket-alt", color: "#19C95D"},
      'Internal transfer': {name: "Internal transfer", icon: "exchange-alt", color: "#19C95D"},
      'Transfer'         : {name: "Transfer", icon: "share-square", color: "#19C95D"},
      'Withdrawals'      : {name: "Withdrawals", icon: "money-bill-alt", color: "#19C95D"},
      name               : 'Withdrawals, checks & transfer',
      group              : true,
      icon               : "money-bill-alt",
      color              : "#19C95D"
    },
    'Misc expenses'                 : {
      'Insurance'             : {name: "Insurance", icon: "users", color: "#9FC3D3"},
      'Laundry / Dry cleaning': {name: "Laundry / Dry cleaning", icon: "diagnoses", color: "#9FC3D3"},
      'Others spending'       : {name: "Others spending", icon: "birthday-cake", color: "#9FC3D3"},
      'Uncategorized'         : {name: "Uncategorized", icon: "barcode", color: "#9FC3D3"},
      name                    : "Misc. expenses",
      group                   : true,
      icon                    : "magic",
      color                   : "#9FC3D3"
    },
    'Entertainment'                 : {
      'Amusements'            : {name: "Amusements", icon: "gamepad", color: "#9b59b6"},
      'Arts & Amusement'      : {name: "Arts & Amusement", icon: "camera-retro", color: "#9b59b6"},
      'Bars & Clubs'          : {name: "Bars & Clubs", icon: "beer", color: "#9b59b6"},
      'Eating out'            : {name: "Eating out", icon: "wine-glass", color: "#9b59b6"},
      'Entertainment - Others': {name: "Entertainment - Others", icon: "at", color: "#9b59b6"},
      'Hobbies'               : {name: "Hobbies", icon: "golf-ball", color: "#9b59b6"},
      'Hotels'                : {name: "Hotels", icon: "bed", color: "#9b59b6"},
      'Pets'                  : {name: "Pets", icon: "paw", color: "#9b59b6"},
      'Sports'                : {name: "Sports", icon: "volleyball-ball", color: "#9b59b6"},
      'Travels / Vacation'    : {name: "Travels / Vacation", icon: "suitcase", color: "#9b59b6"},
      'Winter sports'         : {name: "Winter sports", icon: "snowflake", color: "#9b59b6"},
      name                    : "Entertainment",
      group                   : true,
      icon                    : "rocket",
      color                   : "#9b59b6"
    },
    'Personal care'                 : {
      'Beauty care'           : {name: "Beauty care", icon: "eye", color: "#ff87c2"},
      'Cosmetics'             : {name: "Cosmetics", icon: "paint-brush", color: "#ff87c2"},
      'Hairdresser'           : {name: "Hairdresser", icon: "cut", color: "#ff87c2"},
      'Spa & Massage'         : {name: "Spa & Massage", icon: "diagnoses", color: "#ff87c2"},
      'Personal care - others': {name: "Personal care - others", icon: "heart", color: "#ff87c2"},
      name                    : "Personal care",
      group                   : true,
      icon                    : "leaf",
      color                   : "#ff87c2"
    }
  }
}

const UserSchema = new Schema( {
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
  bankAccounts     : [ {
    type: Schema.ObjectId,
    ref : 'BankAccount'
  } ],
  categories       : Object,
  emailVerified    : Boolean
} )

class UserClass {
  // User's public fields
  static publicFields() {
    return [ 'id', 'displayName', 'email', 'avatarUrl', 'slug', 'isAdmin', 'isGithubConnected', 'bankAccounts', 'emailVerified', 'categories' ]
  }

  static async signInOrSignUp( {
    googleId, email, googleToken, displayName, avatarUrl, bankAccounts, emailVerified, categories = defaultCategories
  } ) {
    const user = await this.findOne( {googleId} ).select( UserClass.publicFields().join( ' ' ) )

    if (user) {
      const modifier = {}

      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refreshToken
      }

      if (_.isEmpty( modifier )) {
        return user
      }

      await this.updateOne( {googleId}, {$set: modifier} )

      return user
    }

    const slug = await generateSlug( this, displayName )

    const newUser = await this.create( {
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
    } )

    return _.pick( newUser, UserClass.publicFields() )
  }
}

const autoPopulateBankAccount = function ( next ) {
  this.populate( 'bankAccounts' )
  next()
}

UserSchema.pre( 'findOne', autoPopulateBankAccount )
UserSchema.pre( 'find', autoPopulateBankAccount )

UserSchema.loadClass( UserClass )

const User = mongoose.model( 'User', UserSchema )

//  uncomment to update categories
User.findOneAndUpdate({_id: mongoose.Types.ObjectId('5ab8023c7aed5e03a286020c')}, {categories: defaultCategories}, {new: true})
  .then(ctx => {console.log(ctx)})
  .catch(err => {console.log(err)})

export default User
