const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const connection = require('./database/database')
const Containers = require('./models/containers.models')
const Moviments = require('./models/moviments.models')

connection
  .authenticate()
  .then(() => console.log("Connected with the database")) 
  .catch(error => console.log(error))


app.use(cors())


app.use(express.json())


app.get('/container', (req, res) => {
  Containers.findAll({order: [['id', 'DESC']]}).then(container => {
    res.send(container)
  })
})

app.post('/container', async (req, res) => {
  const {client, ID, type, category, state} = req.body

  const responsedb = await Containers.create({
    Client: client,
    ID_Container: ID,
    Category: category,
    State: state,
    Type: type
  })
  return res.send().status(200)

})


app.delete('/container/:id', (req, res) => {
  const id = req.params.id
  Containers.destroy({
    where: {
      id: id
    }
  })
  res.send().status(200)
})

app.put('/container', async (req, res) => {
  const {key, client, ID, type, category, state} = req.body
  await Containers.update({
    id: key,
    Client: client,
    ID_Container: ID,
    Category: category,
    State: state,
    Type: type,
  }, {
    where: {
      id: key
    }
  })
  res.send().status(200)
})

app.get('/moviment', (req, res) => {
  Moviments.findAll({
    order: [['id', 'DESC']],
  }).then(moviment => {
    res.send(moviment)
  }).catch(error => res.send(error))
})

app.post('/moviment', async (req, res) => {
  const {containerId, TypeOfMoviment, StartDateAndTime, EndDateAndTime} = req.body


  const responsedb = await Moviments.create({
    TypeOfMoviments: TypeOfMoviment,
    StartDateAndTime: StartDateAndTime,
    EndDateAndTime: EndDateAndTime,
    ID_Container: containerId,
  })
  return res.send().status(200)
  
})

app.delete('/moviment/:id', (req, res) => {
  const id = req.params.id
  Moviments.destroy({
    where: {
      id: id
    }
  })
  res.send().status(200)
})

app.put('/moviment', async (req, res) => {
  const {containerId, key, TypeOfMoviment, StartDateAndTime, EndDateAndTime} = req.body

  await Moviments.update({
    TypeOfMoviments: TypeOfMoviment,
    StartDateAndTime: StartDateAndTime,
    EndDateAndTime: EndDateAndTime,
    ID_Container: containerId,
  }, {
    where: {
      id: key
    }
  })
  res.send().status(200)
})




app.listen(3033, () => console.log("Server running"))