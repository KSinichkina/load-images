var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static('../client'));
app.use(bodyParser.json());

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({
  storage: storage
}).single('file');

var mapResponse = [{
  "id": 1,
  "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0Gvrl0FPkTcoYsKL9irueexpc8oLuVyeRrhjfFFd-MSt56Ek6",
  "tooltip": "2016-12-01 21:46:28.233"
},
  {
    "id": 2,
    "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0Gvrl0FPkTcoYsKL9irueexpc8oLuVyeRrhjfFFd-MSt56Ek6",
    "tooltip": "2016-12-01 21:46:28.233"
  },
  {
    "id": 3,
    "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0Gvrl0FPkTcoYsKL9irueexpc8oLuVyeRrhjfFFd-MSt56Ek6",
    "tooltip": "2016-12-01 21:46:28.233"
  },
  {
    "id": 4,
    "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0Gvrl0FPkTcoYsKL9irueexpc8oLuVyeRrhjfFFd-MSt56Ek6",
    "tooltip": "2016-12-01 21:46:28.233"
  }];

app.get('/', function (req, res) {

  //httpGet(options)
  //  .then(
  //  response => {
  //    console.log(`Fulfilled: ${response}`);
  //    res.send(response);
  //},
  //  error => {
  //    console.log(`Rejected: ${error}`);
  res.send(mapResponse);
  //  }
  //);

});

app.post('/remove', function (req, res) {
    return res.send(mapResponse);
});

app.post('/edit', function (req, res) {
    return res.send(mapResponse);
});

app.post('/uploadImageData', function (req, res) {
    return res.send(mapResponse);
});

app.post('/upload', function(req, res) {
  upload(req,res,function(err){
    console.log(req.file);
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });
});

app.listen('3030', function(){
  console.log('running on 3030...');
});
