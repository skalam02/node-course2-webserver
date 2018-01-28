var express = require('express')
var hbs = require('hbs')
var fs = require('fs')

const port = process.env.PORT || 3000

var app = express()
hbs.registerPartials('./views/partials')
app.set('view engine', 'hbs')

app.use( (req,res,next) => {
  res.send('Under Construction')
})

app.use(express.static(__dirname +'/public'))
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.use((req,res,next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method}, ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log!')
    }
   })
  next()
})

app.get('/', (req,res) => {
  res.render('home', {
    pageTitle: "Home",
    welcomeMessage: "hello"
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    pageTitle: "About",
  })
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: "Unable to handle request"
  })
})

app.listen(port, () => {
  console.log("Server Started")
})