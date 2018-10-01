const express = require('express')
const app = express()
const hbs = require('hbs')
const parser = require('body-parser')

app.use(parser.urlencoded({extended: true}))
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(3000, (req, res)=> {
    console.log('listening on 3000')
})
