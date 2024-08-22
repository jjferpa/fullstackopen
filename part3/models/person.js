const mongoose = require('mongoose');

mongoose.set('strictQuery', false);


const url = process.env.MONGODB_URI;


console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [3, '"{VALUE}" is shorter than the minimun allowed length (3).'],
      required: [true, 'Name required']
    },
    id: Number,
    number: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(?=(?:\d.*?){8,})[0-9]{2,3}-[0-9]{4,}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number. Use the format ##-####### or ###-######`
      },
      minLength: 8,
      required: [true, 'Phone number required']
    }
  });

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;

      return {
        name: returnedObject.name,
        number: returnedObject.number,
        id: returnedObject.id
      };
    }
  });


module.exports = mongoose.model('Person', personSchema);