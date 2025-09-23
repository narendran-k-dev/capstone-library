const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const corsoption = { origin: 'http://localhost:8081' };
const db = require('./src/config/db.config')


app.use(cors(corsoption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to DB');
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to DB:', err);
});

app.listen(PORT,()=>{
    console.log(`listening to port => ${PORT}`)
})
app.use((err,res,req,next)=>{
    console.error(err.stack)
    res.status(err.status || 500).json({error:'internal server error'})
})

