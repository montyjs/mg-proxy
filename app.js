const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const products = 'http://localhost:3001/bundle',
      description = 'http://localhost:3002/bundle',
      reviews = 'http://localhost:3003/bundle';

app.all("/app1/*", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: products});
});

app.all("/app2/*", function(req, res) {
  console.log('redirecting to Server2');
  apiProxy.web(req, res, {target: description});
});

app.all("/app2/*", function(req, res) {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, {target: reviews});
});

app.listen(3000, err => {
  if (err) {
    return console.log(err);
  }
  console.log('You are connected to the proxy')
});