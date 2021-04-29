const axios = require('axios')

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