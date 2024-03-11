const express = require('express');

const app = express();

const port = 3000;


app.get('/', function(req, res){
    res.status(200).end()
});

app.post('/', function(req, res){
    res.status(201).end()
});

app.put('/', function(req, res){
    res.status(200).end()
});

app.delete('/', function(req, res){
    res.status(204).end()
});

app.listen(port, () => {
    console.log(`Escutando na porta $ {port}`)
});

module.exports = app;