const express = require('express');
const cors = require('cors');
const db = require('./src/model');
require('dotenv').config();

const app = express(); 
const PORT = 4000;
const corsoption = { origin: 'http://localhost:8081' };

app.use(cors(corsoption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/book.routes.js')(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: 'internal server error' });
});

module.exports = app;

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
