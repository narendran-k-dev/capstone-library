const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 4000;
const corsoption = { origin: 'http://localhost:8081' };
const db = require('./src/model');


app.use(cors(corsoption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

require('./src/routes/book.routes.js')(app);

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(err.status || 500).json({error:'internal server error'})
})


