const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))

app.listen(3000, err => {
  if (err) {
    return console.log(err);
  }
  console.log('You are connected to the proxy on port 3000')
});