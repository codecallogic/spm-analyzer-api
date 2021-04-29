const Parse = require('parse/node')

Parse.initialize(process.env.BACK4APP_APP_ID, process.env.BACK4APP_JS_KEY)
Parse.serverURL = 'https://parseapi.back4app.com/'

exports.login = async (req, res) => {
  try {
    let user = await Parse.User.logIn(req.body.email, req.body.password)
    const loggedInUser = new Object()
    loggedInUser.id = user.id
    loggedInUser.username = user.get('username')
    loggedInUser.email = user.get('email')
    loggedInUser.subscription = user.get('currentSubscriptionPlan')
    return res.status(202).cookie(
      "user", JSON.stringify(loggedInUser), {
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
      httpOnly: true,
      secure: false,
      overwrite: true
    }).send(loggedInUser)
  } catch (error) {
    return res.status(400).json('User does not exist')
  }
}