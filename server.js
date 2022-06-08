const express = require('express')
require('dotenv').config();
const dbpassword = process.env.dbpwd

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


const PORT = 4001
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`) 
})

// set up database
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  `mongodb+srv://dblearner:${dbpassword}@cluster0.am5d076.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const affirmationSchema = new mongoose.Schema({
  content: String,
  tLikes: Number
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
  mongoose
  .connect(url).then((result) => {
    
    Affirmation.find({}).then((affirmations) => {response.render('index.ejs', { info: affirmations })
  }) 
  })
  .catch((err) => console.log(err)) 
  })



app.get('/api/affirmations', (request, response) => {
  mongoose
  .connect(url).then((result) => {
    
    Affirmation.find({}).then((affirmations) => {response.json(affirmations) }) 
    .then(() => mongoose.connection.close()) 
  })
  .catch((err) => console.log(err)) 
  })

app.get('/api/affirmation/:id' , (request, response) => {
    const affid = request.params.id
    
    mongoose
    .connect(url).then((result) => {
      console.log('connected for affirmations')
      Affirmation.findById(affid).then((affirmation) => {response.json(affirmation) }) 
      .then(() => mongoose.connection.close()) 
    })
    .catch((err) => console.log(err)) 
    })

app.delete('/api/affirmation/:id', (request, response) => {
  const affid = request.params.id
  console.log('affid is', affid)
  mongoose
  .connect(url).then((result) => {
    console.log('connected for affirmations')
    Affirmation.findByIdAndRemove({_id: affid}).then((affirmation) => {response.json(affirmation) }) 
  //  .then(() => mongoose.connection.close()) 
  })
  .catch((err) => console.log(err)) 
  })

app.post('/api/affirmation', (request, response) => {
    const one_affirmation = request.body
    console.log('posted: ' , one_affirmation)
    response.redirect('/')

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
    //return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
})


