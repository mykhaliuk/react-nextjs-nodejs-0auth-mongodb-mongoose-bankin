import _                  from 'lodash'
import mongoose, {Schema} from 'mongoose'
import generateSlug       from '../utils/slugify'

const defaultCategories = {
  Incomes : {
    Salaries  : 'Salaries',
    Savings   : 'Savings',
    Retirement: 'Retirement'
  },
  Expenses: {
    'Food & Dining': {
      'Supermarket / Groceries': 'Supermarket / Groceries'
    }
  }
}

const mongoSchema = new Schema({
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
  bankAccounts     : Array,
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

mongoSchema.loadClass(UserClass)

const User = mongoose.model('User', mongoSchema)

export default User
