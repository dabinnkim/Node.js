//서버 오픈하는 기본 문법
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

//어떤 데이터베이스에 데이터 저장할건지 변수 만들어 주기

const MongoClient = require('mongodb').MongoClient;



var db;
MongoClient.connect('mongodb+srv://kdb:6743@cluster0.bawt6ey.mongodb.net/?retryWrites=true&w=majority', function (에러, client) {

    //연결되면 할일
    if (에러) return console.log('에러')
    db = client.db('todoapp'); //todoapp이라는 db로 연결


    db.collection('post').insertOne({이름:'kim', 나이:20}, function (에러, 결과) {
        console.log('저장완료')
    });//내가 원하는 데이터 

    app.listen(8080, function () { //서버를 열어줌
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