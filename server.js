//서버 오픈하는 기본 문법
const express = require('express');
const app = express();

app.listen(8080, function(){ //서버를 열겠다
    console.log('listening on 8080')
});

//GET 요청
app.get('/pet',function(req,res){
    res.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/write',function(req,res){
    res.sendFile(__dirname + '/write.html');
})