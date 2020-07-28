const express = require('express');
const app = express()
const axios = require('axios');
var bodyParser  = require("body-parser");
var helperFunctions = require('./helperFunction')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
  res.redirect(`/orders/${req.body.location}`)
})

app.get('/orders/:id', function (req, res) {
  var orderList = []
  axios.get(`${process.env.API}/orderdata?location=${req.params.id}`)
    .then(response => {
      // console.log(response, "ress")
      var orderData = helperFunctions.sortData(response.data)
      // console.log(orderData)
      // orderList = response.data
      res.render("orderList", {orderData: orderData})
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
})

app.listen(process.env.PORT, function () {
  console.log('Kitchen order app server 5000')
})