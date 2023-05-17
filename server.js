//서버 오픈하는 기본 문법
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient; //몽고db와 연결하는 코드
app.set("view engine", "ejs");

var db; //어떤 데이터베이스에 저장할건지
MongoClient.connect(
  "mongodb+srv://kdb:6743@cluster0.bawt6ey.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  function (에러, client) {
    //useUnifiedTopology 워닝메세지 제거해줌

    //연결되면 할일
    if (에러) return console.log("에러");

    db = client.db("todoapp"); //몽고에서 todoapp이라는 폴더로 접속해주세요~

    // db.collection('test').insertOne({ 이름: 'kdb', 나이: '2' }, function (에러, 결과) { //test 컬렉션에 데이터 추가
    //     console.log('저장완료')
    // })

    // db.collection('post').insertOne({ 이름: '김다빈', 나이: '2222', _id: '첫번째' }, function (에러, 결과) { //post 컬렉션에 데이터 추가
    //     console.log('저장완료')
    // })

    app.listen(8080, function () {
      //서버를 열어줌
      console.log("listening on 8080");
    });
  }
);

//GET 요청
app.get("/pet", function (req, res) {
  res.send("펫용품 쇼핑할 수 있는 페이지입니다.");
});

app.get("/beauty", function (req, res) {
  res.send("여기는 뷰티용품");
});

//html파일 GET 요청
app.get("/", function (req, res) {
  // '/'은 메인페이지
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  //write로 들어가면 write.html 파일 보여줄거에요
  res.sendFile(__dirname + "/write.html");
});

//POST 요청
//어떤 사람이 /add경로로 post 요청하면 ~~를 해주세요
// app.post('/add', function (req, res) {
//     res.send('전송완료');
//     console.log(req.body.title); //요청req에 담긴 body의 name="title"의 정보를 출력
//     console.log(req.body.date);
// });

//몽고DB에 input 데이터 저장
app.post("/add", function (req, res) {
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (에러, 결과) {
      //counter에서 원하는 값 찾기
      console.log(결과.totalPost);
      var 총게시물개수 = 결과.totalPost;

      db.collection("post").insertOne(
        { _id: 총게시물개수 + 1, title: req.body.title, date: req.body.date },
        function (에러, 결과) {
          console.log("add로 저장완료");
          //counter라는 콜렉션에 있는 totalPost 라는 항목도 post에 데이터 항목이 추가 될때마다 1씩 증가해야됨
          //counter에서 name이 게시물갯수인 데이터 중 totalPost의 데이터를 +1 해주세요
          db.collection("counter").updateOne(
            { name: "게시물갯수" },
            { $inc: { totalPost: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러);
              }
              res.send("전송완료");
            }
          );
        }
      );
    }
  );
});

//몽고DB에 저장한 데이터 보여주는 페이지 만들기
app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      //1. DB에 저장된 post라는 collection안의 모든데이터를 꺼내주세요
      console.log(결과);
      res.render("list.ejs", { posts: 결과 }); //2.결과라는 데이터를 posts라는 이름으로 ejs에 보내주세요~
    });
});

app.delete("/delete", function (req, res) {
  console.log(req.body); //{ _id: '1' } 데이터를 가진걸 DB에서 찾아서 삭제
  req.body._id = parseInt(req.body._id); //ajax요청으로 데이터를 서버에 전송할때 숫자가 문자로 바뀌는 경우가 있음
  db.collection("post").deleteOne(req.body, function (에러, 결과) {
    //데이터 전체를 삭제해야하므로 req.body -> body 전체!
    console.log("삭제완료"); //list.ejs에서 쓴 ajax의 data인 _id값이 req.body로 담겨오는 것
  });
  res.send("삭제완료");
});
