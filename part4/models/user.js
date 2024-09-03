const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
  })
  
  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash

      return {
        blogs: returnedObject.blogs,
        username: returnedObject.username,
        name: returnedObject.name,
        id: returnedObject.id
  
      }
    }


  })
  
  const User = mongoose.model('User', userSchema)
  
  module.exports = User