var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const port=process.env.PORT || 3000;

const dbUrl="mongodb+srv://users:Yp0dUSAAugUWUJ8C@kishan.m6muzpf.mongodb.net/users"
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;



db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

let date = new Date().toLocaleDateString();
console.log(date);

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var country = req.body.country;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password,
        "country":country,
        "date":date
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port);



console.log(`Server running :${port}`);