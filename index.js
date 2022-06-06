const express = require('express')
//const envy = require('envy');
//const env = envy();
const dbpasswd = ''

const app = express()
app.use(express.json())

// set up database
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  `mongodb+srv://dblearner:${dbpasswd}@cluster0.am5d076.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const affirmationSchema = new mongoose.Schema({
  content: String
})

affirmationSchema.set('toJSON',{
  transform: (document,returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Affirmation = mongoose.model('Affirmation', affirmationSchema)
//

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/affirmations', (request, response) => {
  mongoose
  .connect(url).then((result) => {
    console.log('connected for affirmations')
    Affirmation.find({}).then((affirmations) => {response.json(affirmations) }) 
    .then(() => mongoose.connection.close()) })
  .catch((err) => console.log(err)) 
  })

app.get('/api/affirmation/:id' , (request, response) => {
    const affid = request.params.id
    console.log('affid is', affid)
    mongoose
    .connect(url).then((result) => {
      console.log('connected for affirmations')
      Affirmation.findById(affid).then((affirmation) => {response.json(affirmation) }) 
      .then(() => mongoose.connection.close()) })
    .catch((err) => console.log(err)) 
    })

app.delete('/api/affirmation/:id', (request, response) => {
  const affid = request.params.id
  console.log('affid is', affid)
  mongoose
  .connect(url).then((result) => {
    console.log('connected for affirmations')
    Affirmation.findOneAndDelete(affid).then((affirmation) => {response.json(affirmation) }) 
    .then(() => mongoose.connection.close()) })
  .catch((err) => console.log(err)) 
  })

app.post('/api/affirmation', (request, response) => {
    const one_affirmation = request.body
    console.log(one_affirmation)
    response.json(one_affirmation)

  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const affirmation = new Affirmation({
      content: one_affirmation.content
    })
    return affirmation.save()
  })
  .then(() => {
    console.log('affirmation saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
})

const PORT = 4001
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`) 
})

