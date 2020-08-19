const express = require('express')
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.send('You have reached app.js of the web scraper.')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
