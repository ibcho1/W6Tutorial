/*
car: maker, year
*/

let mongodb = require('mongodb');
let mongoDBClient = mongodb.MongoClient;
let express = require('express');
let bodyParser = require('body-parser');



let db = null; //database
let col = null; //collection (i.e. table)
let url = "mongodb://localhost:27017";
let app = express();

app.use(bodyParser.urlencoded({extended:false}));


mongoDBClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, client){
    db = client.db('w6t1');
    col = db.collection('carsCollection');
    col.insertOne({maker: 'BMW', year: 1998});
});

app.get('/', function(req, res){
    res.sendFile(__dirname + "/views/index.html")
});

app.post('/newCarRequest', function(req, res){
    let myNewCarObj = {maker:req.body.maker, year:parseInt(req.body.year)};
    col.insertOne(myNewCarObj); //req.body
    res.redirect('/');
});

app.get('/getCars', function(req, res){
    let query = {};
    col.find(query).toArray(function(err, data){
        res.send(data);
    });
});

app.get('/deleteOld', function(req, res){
    let query = {year:{$lte:2010}};
    col.deleteMany(query, function(err, obj){
        console.log(obj.result);

        col.find({}).toArray(function(err, data){
            res.send(data);
        });
    });

    //col.deleteMany({year: {$lte: 2010}});
    
});

app.listen(8080);

//VMInstances > Start Instance > Click SSH >  sudo apt install -y mongodb
asdasd