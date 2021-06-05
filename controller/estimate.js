const Parse = require('parse/node')
const axios = require('axios')

Parse.initialize(process.env.BACK4APP_APP_ID, process.env.BACK4APP_JS_KEY)
Parse.serverURL = 'https://parseapi.back4app.com/'

exports.estimate = async (req, res) => {
  const {market, category, rank} = req.body
  try {
    const response = await axios.get(`https://il7kji6jcl.execute-api.us-east-2.amazonaws.com/dev/salesEstimator?market=${encodeURIComponent(market)}&category=${encodeURIComponent(category)}&rank=${encodeURIComponent(rank)}`)
    console.log(response)
    return res.json(response.data)
  } catch (error) {
    console.log(error)
    if(error){
      return res.status(400).json('Error')
    }
  }
}

exports.surveySuggestion = async (req, res) => {
  const Suggestion = Parse.Object.extend("Suggestions");
  const sugggestion = new Suggestion();

  console.log(req.body)

  if(req.body.question2 == null) return res.json('Suggestion field was empty')

  sugggestion.set("userEmail", req.body.userEmail);
  sugggestion.set("Suggestion", req.body.question2);

  sugggestion.save()
  .then((suggestion) => {
    // Success
    console.log('New object created with objectId: ' + suggestion.id);
    return res.json('New object created with objectId: ' + suggestion.id)
  }, (error) => {
    // Save fails
    console.log('Failed to create new object, with error code: ' + error.message);
    return res.status(400).json('New object created with objectId: ' + suggestion.id)
  });
}

exports.surveyCancellation = async (req, res) => {
  const Cancellation = Parse.Object.extend("CancellationReasons");
  const cancellation = new Cancellation();

  res.send('Hello')

  cancellation.set("userEmail", req.body.userEmail);
  cancellation.set("cancelReason", req.body.question1)

  cancellation.save()
  .then((cancellation) => {
    // Success
    console.log('New object created with objectId: ' + cancellation.id);
    return res.json('New object created with objectId: ' + cancellation.id)
  }, (error) => {
    // Save fails
    console.log('Failed to create new object, with error code: ' + error.message)
    return res.status(400).json('Failed to create new object, with error code: ' + error.message)
  });
}