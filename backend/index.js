const connectToMongoose = require('./db');
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');

connectToMongoose();

app.use(cors());
app.use(express.json());

app.use('/api/chess', require('./routes/chess'));

app.get('/', (req, res) => {
  res.send('Hi! chesslive365 end-points are working fine...')
})

app.listen(port, () => {
  console.log(`backend of the app listening at http://localhost:${port}`)
})



 