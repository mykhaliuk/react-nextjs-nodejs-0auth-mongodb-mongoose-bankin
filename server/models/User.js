import _                    from 'lodash'
import mongoose, { Schema } from 'mongoose'
import generateSlug         from '../utils/slugify'
import { faCheckSquare }    from '@fortawesome/free-solid-svg-icons/index'

const defaultCategories = {
  Incomes : {
    Salaries       : {name: "Salaries", icon: "sign-in-alt", color: "#4CAF50"},
    Savings        : {name: "Savings", icon: "sign-in-alt", color: "#4CAF50"},
    'Extra incomes': {name: "Extra incomes", icon: "sign-in-alt", color: "#4CAF50"},
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
      'Auto & Transport - others': {name: "Auto & Transport - Others", icon: "car", color: "#00cbcb"},
      'Auto insurance'           : {name: "Auto insurance", icon: "shield-alt", color: "#00cbcb"},
      'Car maintenance'          : {name: "Car maintenance", icon: "cogs", color: "#00cbcb"},
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
      'Insurance'             : {name: "Insurance", icon: "users", color: "#81D4FA"},
      'Laundry / Dry cleaning': {name: "Laundry / Dry cleaning", icon: "diagnoses", color: "#81D4FA"},
      'Others spending'       : {name: "Others spending", icon: "birthday-cake", color: "#81D4FA"},
      'Uncategorized'         : {name: "Uncategorized", icon: "barcode", color: "#81D4FA"},
      name                    : "Misc. expenses",
      group                   : true,
      icon                    : "magic",
      color                   : "#81D4FA"
    },
    'Entertainment'                 : {
      'Amusements'            : {name: "Amusements", icon: "gamepad", color: "#4A148C"},
      'Arts & Amusement'      : {name: "Arts & Amusement", icon: "camera-retro", color: "#4A148C"},
      'Bars & Clubs'          : {name: "Bars & Clubs", icon: "beer", color: "#4A148C"},
      'Eating out'            : {name: "Eating out", icon: "wine-glass", color: "#4A148C"},
      'Entertainment - Others': {name: "Entertainment - Others", icon: "at", color: "#4A148C"},
      'Hobbies'               : {name: "Hobbies", icon: "golf-ball", color: "#4A148C"},
      'Hotels'                : {name: "Hotels", icon: "bed", color: "#4A148C"},
      'Pets'                  : {name: "Pets", icon: "paw", color: "#4A148C"},
      'Sports'                : {name: "Sports", icon: "volleyball-ball", color: "#4A148C"},
      'Travels / Vacation'    : {name: "Travels / Vacation", icon: "suitcase", color: "#4A148C"},
      'Winter sports'         : {name: "Winter sports", icon: "snowflake", color: "#4A148C"},
      name                    : "Entertainment",
      group                   : true,
      icon                    : "rocket",
      color                   : "#4A148C"
    },
    'Personal care'                 : {
      'Beauty care'           : {name: "Beauty care", icon: "eye", color: "#F06292"},
      'Cosmetics'             : {name: "Cosmetics", icon: "paint-brush", color: "#F06292"},
      'Hairdresser'           : {name: "Hairdresser", icon: "cut", color: "#F06292"},
      'Spa & Massage'         : {name: "Spa & Massage", icon: "diagnoses", color: "#F06292"},
      'Personal care - others': {name: "Personal care - others", icon: "heart", color: "#F06292"},
      name                    : "Personal care",
      group                   : true,
      icon                    : "leaf",
      color                   : "#F06292"
    },
    'Shopping'                      : {
      'Books'            : {name: "Books", icon: "book", color: "#D50000"},
      'Clothing & Shoes' : {name: "Clothing & Shoes", icon: "user-secret", color: "#D50000"},
      'Gifts'            : {name: "Gifts", icon: "gift", color: "#D50000"},
      'Hardware'         : {name: "Hardware", icon: "laptop", color: "#D50000"},
      'Licences'         : {name: "Licences", icon: "qrcode", color: "#D50000"},
      'Movies'           : {name: "Movies", icon: "film", color: "#D50000"},
      'Music'            : {name: "Music", icon: "music", color: "#D50000"},
      'Shopping - Others': {name: "Shopping - Others", icon: "boxes", color: "#D50000"},
      'Sporting goods'   : {name: "Sporting goods", icon: "football-ball", color: "#D50000"},
      name               : "Shopping",
      group              : true,
      icon               : "shopping-cart",
      color              : "#D50000"
    },
    'Home'                          : {
      'Electricity'       : {name: "Electricity", icon: "lightbulb", color: "#677fe0"},
      'Gas'               : {name: "Gas", icon: "burn", color: "#677fe0"},
      'Home insurance'    : {name: "Home insurance", icon: "umbrella", color: "#677fe0"},
      'Maintenance'       : {name: "Maintenance", icon: "wrench", color: "#677fe0"},
      'Misc utilities'    : {name: "Misc utilities", icon: "home", color: "#677fe0"},
      'Rent'              : {name: "Rent", icon: "home", color: "#677fe0"},
      'Water'             : {name: "Water", icon: "tint", color: "#677fe0"},
      'Office improvement': {name: "Office improvement", icon: "couch", color: "#677fe0"},
      name                : "Home",
      group               : true,
      icon                : "home",
      color               : "#677fe0"
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

/*//  uncomment to update categories
 User.findOneAndUpdate({_id: mongoose.Types.ObjectId('5ab8023c7aed5e03a286020c')}, {categories: defaultCategories}, {new: true})
 .then(ctx => {console.log(ctx)})
 .catch(err => {console.log(err)})*/

export default User
