//npm run dev

const express = require('express')
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 5000

const thing = require('./thing')
const craig = require('./craigslistScraper')


app.use(cors());

app.get('/', (req, res) => {
  res.send('You have reached app.js of the web scraper.')
})

app.get('/thing', (req, res) => {
  res.send(thing)
})

app.get('/craig', (req, res) => {
  res.send(craig)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
