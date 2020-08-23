//npm run dev

const express = require('express')
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 5000

const test = require('./thing')
// const craig = require('./craigslistScraper')

app.use(cors());

app.get('/', (req, res) => {
  res.send('You have reached app.js of the web scraper.')
})

app.get('/thing', (req, res) => {
  // res.json(thing)
  // console.log("thing:" + thing)
  // res.json({"key": "sent from app.js not thing.js"})
  // res.send(thing)

  // req.thing = thing
  // console.log(res.myData)

  // this works 
  const thingVar = test()
  console.log(thingVar)
  res.send(thingVar)


  // this works for variable thing that is only a json object
  // res.json(test)

})

app.get('/craig', (req, res) => {
  res.send(craig)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})