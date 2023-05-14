//서버 오픈하는 기본 문법
const express = require('express')
const app = express();
app.use(express.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient; //몽고db와 연결하는 코드

// app.set('view engine','ejs')




var db; //어떤 데이터베이스에 저장할건지
MongoClient.connect('mongodb+srv://kdb:6743@cluster0.bawt6ey.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) { //useUnifiedTopology 워닝메세지 제거해줌

    //연결되면 할일
    if (에러) return console.log('에러')

    db = client.db('todoapp'); //몽고에서 todoapp이라는 폴더로 접속해주세요~

    ///add로 post요청시 db에 저장
    // app.post('/add',function(req,res){
    //     const data = req.body
    //     res.send('전송완료') //응답.send()코드는 항상 존재해야됨, 전송 성공하든 실패하든
    //     db.collection('test').insertOne(data, function (에러, 결과) {
    //         console.log('저장완료')
    //     });
    // })
    
   
    db.collection('test').insertOne({이름:'kdb',나이:'2'}, function (에러, 결과) { //test 컬렉션에 데이터 추가
                 console.log('저장완료')
    })

    db.collection('post').insertOne({이름:'김다빈',나이:'2222'}, function (에러, 결과) { //test 컬렉션에 데이터 추가
                 console.log('저장완료')
    })

    app.listen(8080, function () { //서버를 열어줌
        console.log('listening on 8080')
    });

})

// app.get('/list',function(요청,응답){{}
//     db.collection('post').find().toArray(function(에러,결과){
//         console.log(결과)
//         응답.render('list.ejs',{posts:결과}) //list.ejs 파일을 렌더링함과 동시에 posts:결과
//     })
// })










//GET 요청
app.get('/pet',function(req,res){
    res.send('펫용품 쇼핑할 수 있는 페이지입니다.'); 
});

app.get('/beauty',function(req,res){
    res.send('여기는 뷰티용품')
})


//html파일 GET 요청
app.get('/',function(req,res){ // '/'은 메인페이지
    res.sendFile(__dirname + '/index.html');
});

app.get('/write',function(req,res){ //write로 들어가면 write.html 파일 보여줄거에요
    res.sendFile(__dirname + '/write.html');
});


//POST 요청
//어떤 사람이 /add경로로 post 요청하면 ~~를 해주세요
app.post('/add',function(req,res){
    res.send('전송완료');
    console.log(req.body.title); //body의 name="title"의 정보를 출력
    console.log(req.body.date);
});

// app.post('/add',function(req,res){
//     res.send('전송완료')
//     re
// })