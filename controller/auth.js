const Parse = require('parse/node')
const axios = require('axios')

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

exports.register = async (req, res) => {
  let user = new Parse.User();
    user.set("username", req.body.email);
    user.set("password", req.body.password);
    user.set("email", req.body.email);
    user.set("currentSubscriptionPlan", 0);
  
  user.signUp().then(function(user) {
      const signedUpUser = new Object()
      signedUpUser.id = user.id
      signedUpUser.username = user.get('username')
      signedUpUser.email = user.get('email')
      signedUpUser.subscription = user.get('currentSubscriptionPlan')
      return res.status(202).cookie(
        "user", JSON.stringify(signedUpUser), {
        sameSite: 'strict',
        expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
        httpOnly: true,
        secure: false,
        overwrite: true
      }).send(signedUpUser)
    }).catch(function(error){
      return res.status(400).json(error.message)
  });
}

exports.changeSubscription = async (req, res) => {
  // console.log(req.body)
  let objectId = req.body.changeUserSubscription.id
  let changeCurrentSubscriptionPlan = req.body.subscriptionValue

  // console.log(objectId)
  // console.log(changeCurrentSubscriptionPlan)

  try {
    const responseChangeSubscription = await axios.post(`https://${process.env.BACK4APP_APP_ID}:javascript-key=${process.env.BACK4APP_JS_KEY}@spmanalyzernew.b4a.app/functions/editUserProperty`, {objectId, changeCurrentSubscriptionPlan})
    
    const Users = Parse.Object.extend("User");
    const gettingUsers = new Parse.Query(Users);

    gettingUsers.get(req.body.changeUserSubscription.id)
    .then((user) => {
      const updatedUser = new Object()
      updatedUser.id = user.id
      updatedUser.username = user.get('username')
      updatedUser.email = user.get('email')
      updatedUser.subscription = user.get('currentSubscriptionPlan')
      return res.status(202).cookie(
        "user", JSON.stringify(updatedUser), {
        sameSite: 'strict',
        expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
        httpOnly: true,
        secure: false,
        overwrite: true
      }).send(updatedUser)
    }, (error) => {
      console.log(error)
    });
    
  } catch (error) {
    console.log(error.response)
  }
}

exports.forgotPassword = (req, res) => {
  Parse.User.requestPasswordReset(req.body.email).then(function() {
    console.log("Password reset request was sent successfully");
    return res.json("Password reset request was sent successfully")
  }).catch(function(error) {
    return res.json(error)
  });
}