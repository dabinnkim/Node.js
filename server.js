//서버 오픈하는 기본 문법
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;





var db;
MongoClient.connect('mongodb://kdb:6743@ac-9dpe9ub-shard-00-00.bawt6ey.mongodb.net:27017,ac-9dpe9ub-shard-00-01.bawt6ey.mongodb.net:27017,ac-9dpe9ub-shard-00-02.bawt6ey.mongodb.net:27017/?ssl=true&replicaSet=atlas-4bkihp-shard-0&authSource=admin&retryWrites=true&w=majority',function(error,client){
if(error) return console.log(error)

db = client.db('todoapp');

db.collection('post').insertOne('저장할데이터',function(에러,결과){
    console.log('저장완료');
});

app.listen(8080, function(){ //서버를 열어줌
    console.log('listening on 8080')
});


})


//GET 요청


app.get('/pet',function(req,res){
    res.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/write',function(req,res){
    res.sendFile(__dirname + '/write.html');
});

//POST 요청
app.post('/add',function(req,res){
    res.send('전송완료');
    console.log(req.body.title); //body의 name="title"의 정보를 출력
    console.log(req.body.date);
});