const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const bcrypt = require('bcryptjs')
const Users = require('../../models/users')

const Basic = new BasicStrategy(async (username, password, done) => {
  try {
    const user = await Users.findOne({ email: username })
    console.log(user)
    if (user.length < 0) {
      console.log('Usuario no existe')
      return done(null, false, { message: 'Wrong username or password' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Wrong username or password' })
    }

    delete user.password
    return done(null, user)
  } catch (error) {
    console.log(error)
    done(error)
  }
})

passport.use('basic-strategy', Basic)
