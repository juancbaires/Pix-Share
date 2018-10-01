const express = require('express')
const app = express()
const hbs = require('hbs')
const parser = require('body-parser')

app.use(parser.urlencoded({extended: true}))
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.set('port', process.env.PORT || 3000) 

app.listen(app.get('port'), () => console.log('server is running'));