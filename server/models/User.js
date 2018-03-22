import _                  from 'lodash'
import mongoose, {Schema} from 'mongoose'
import generateSlug       from '../utils/slugify'

const mongoSchema = new Schema({
  googleId         : {
    type    : String,
    required: true,
    unique  : true
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
  emailVerified    : Boolean
})

class UserClass {
  // User's public fields
  static publicFields() {
    return ['id', 'displayName', 'email', 'avatarUrl', 'slug', 'isAdmin', 'isGithubConnected', 'bankAccounts', 'emailVerified']
  }

  static async signInOrSignUp({
    googleId, email, googleToken, displayName, avatarUrl, bankAccounts, emailVerified
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
      emailVerified
    })

    return _.pick(newUser, UserClass.publicFields())
  }
}

mongoSchema.loadClass(UserClass)

const User = mongoose.model('User', mongoSchema)

export default User
