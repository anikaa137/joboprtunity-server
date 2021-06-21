const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


require('dotenv').config()
// console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME)

const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send(' Jor Hunter!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mivuu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('Are you there?', err)

 const JobPostCollection = client.db("jobortunity").collection("jobPost");
 const PackageCollection = client.db("jobortunity").collection("Package");
 console.log('database connected successfully')

// add job

app.post('/addJob', (req, res) => {
  const newService = req.body;
  console.log('add new ser', newService)
  JobPostCollection.insertOne(newService)
    .then(result => {
      console.log('inserted conunt', result.insertedCount)
      res.send(result.insertedCount > 0)
    })
})

app.get('/joblist', (req, res) => {
  JobPostCollection.find({})
  .toArray((err, items) => {
    res.send(items)
  })
})

app.post("/employPaymet", (req, res) => {
  const userInfo = req.body;
  console.log(req.body);
  PackageCollection.insertOne(userInfo).then((result) => {
    console.log(result);
    res.send(result.insertedCount > 0);
  });
});






















});















app.listen(port)