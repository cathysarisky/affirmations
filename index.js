const express = require('express')
const app = express()
app.use(express.json())


let affirmations = [
    {
      id: 1,
      content: "We don't get got, we go get!"

    },
    {
      id: 2,
      content: "Use the console.log!",
    }
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/affirmation', (request, response) => {
    response.json(affirmations)
  })

app.get('/api/affirmation/:id' , (request, response) => {
    const id = Number(request.params.id)
    const one_affirmation = affirmations.find(one_affirmation => one_affirmation.id === id)
    if (one_affirmation) {
        response.json(one_affirmation)
    } else {response.status(404).end()}
    
})

app.delete('/api/affirmation/:id', (request, response) => {
    const id = Number(request.params.id)
    one_affirmation = affirmations.filter(one_affirmation => one_affirmation.id !== id)
    console.log(one_affirmation)
    response.status(204).end()
  })

app.post('/api/affirmation', (request, response) => {
    const one_affirmation = request.body
    console.log(one_affirmation)
    response.json(one_affirmation)
})

const PORT = 4001
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`) 
})