const { User } = require("../models")
const md5 = require("md5")
const jwt = require('jsonwebtoken')
const { handleError, handleResponse } = require("../utils/helpers")
const { registerUser } = require("../utils/common")
const jwtkey = "jwt"


// Register a User

exports.register = async (req, res) => {

  const { error } = registerUser.validate(req.body, { abortEarly: false })

  if (error) {
    return handleError(error, 400, res)
  }
  const { email, password, first_name, last_name, role, loginId, gender, contact
  } = req.body

  let data = ({
    email: email.toLowerCase(),
    password: md5(password),
    first_name,
    last_name,
    role,
    loginId,
    gender,
    contact

  })

  const newUser = new User(data);

  try {
    let users = await User.findOne({ email: req.body.email })

    if (users) {

      handleResponse(res, 'User already exists for this email', 500)

      return
    }

    await newUser.save()

    const token = await jwt.sign({ data }, jwtkey, { expiresIn: '2592000s' })

    const datad = { ...newUser._doc, token }

    handleResponse(res, datad, 201)

  }

  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

exports.findAll = async (req, res) => {

  /****
   * 
   *   const { search, sortBy, sortOrder, filters } = req.query;
  
      // Build search query
      const searchQuery = search ? { name: { $regex: new RegExp(search, 'i') } } : {};
  
      // Build sorting query
      const sortQuery = sortBy && sortOrder ? { [sortBy]: sortOrder } : {};
  
      // Build filtering query
      const filterQuery = filters ? JSON.parse(filters) : {};
  
      // Combine all queries
      const query = { ...searchQuery, ...filterQuery };
  
      // Find documents matching the query
      const myModels = await MyModel.find(query).sort(sortQuery);
   * 
   * 
   * **/

  const users = await User.find().then(data => {
    handleResponse(res, data, 200)
  }).catch(err => {
    handleError(err, 400, res)
  })
}
