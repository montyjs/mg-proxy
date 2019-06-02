const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

/** ****************************
 * Why is this the way it is? **
 * *****************************
 * Brace yourself...
 * 
 * When we pull in your bundle.js, it makes a fetch to the current url on its desired port.
 * For products, that will evaluate to, 
 *    
 *    | return fetch('http://localhost:3001/products')     // when run locally
 *    or
 *    | return fetch('http://your-proxy-url.us-west-2.elasticbeanstalk.com:3001/products) // when deployed
 * 
 *  The fetch needs to be,
 * 
 *    | return fetch('http://mg-product-wrapper-dev.us-west-2.elasticbeanstalk.com/products')
 *    
 *  So, to receive requests on port 3001, we listen on port 3001 and add a route for '/products'.
 *  If we get a request on '/products', we redirect the client to the appropraite route!
 *
 * It is hacky-ghetto-loadbalancer, but it works!
 */


// Product Redirecting
app.get('/images', (req, res) => {
  res.redirect('http://mg-product-wrapper-dev.us-west-2.elasticbeanstalk.com/images')
});

app.get('/products', (req, res) => {
  res.redirect('http://mg-product-wrapper-dev.us-west-2.elasticbeanstalk.com/products')
});

// Description Redirecting
app.get('/descriptions', (req, res) => {
  res.redirect('http://jb-description-dev.us-west-2.elasticbeanstalk.com/descriptions')
});

app.get('/mensSizes', (req, res) => {
  res.redirect('http://jb-description-dev.us-west-2.elasticbeanstalk.com/mensSizes')
});

app.get('/womensSizes', (req, res) => {
  res.redirect('http://jb-description-dev.us-west-2.elasticbeanstalk.com/womensSizes')
});

app.get('/euSizes', (req, res) => {
  res.redirect('http://jb-description-dev.us-west-2.elasticbeanstalk.com/euSizes')
});

// Reviews Redirecting
app.get('/reviews', (req, res) => {
  res.redirect('http://reviews-1.us-west-2.elasticbeanstalk.com/reviews')
});



app.listen(3000, err => {
  if (err) {
    return console.log(err);
  }
  console.log('You are connected to the proxy on port 3000')
});

app.listen(3001, err => {
  if (err) {
    return console.log(err);
  }
  console.log('You are connected to the proxy on port 3001')
});

app.listen(3002, err => {
  if (err) {
    return console.log(err);
  }
  console.log('You are connected to the proxy on port 3002')
});

app.listen(3003, err => {
  if (err) {
    return console.log(err);
  }
  console.log('You are connected to the proxy on port 3003')
});