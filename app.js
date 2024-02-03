const express = require("express");
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const { upload } = require('./middleware/fileUpload');


const app = express();
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

let students = [
    {id:'1', name: 'Alice', major:'Computer Science', gpa: 3.2,profile: '/images/alice.jpg'},
    {id: '2', name: 'Jerry', major:'Biology', gpa: 3.0, profile: '/images/bob.jpg'},
    {id: '3', name: 'Wesley', major:'History', gpa: 3.8,profile: '/images/charlie.jpg' }

    ];


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get('/', (req, res)=>{
    res.render('index');
    // res.statusCode=200;
    // console.log(__dirname);
    // console.log(req.url);
    // console.log(req.query);
    // res.sendFile('./views/index.html',{root: __dirname});
});

app.get('/students', (req,res)=>{
    res.render('students', {students});
});

app.post('/students', upload, (req,res)=>{
    let student = req.body;
    student.id = uuidv4();
    student.profile = '/images/' + req.file.filename;
    students.push(student);
    res.redirect('/students');
});

app.get('/students/new', (req,res)=>{
    res.render('new');
});

app.get('/students/:sid', (req, res)=>{
    
    let id = req.params.sid;

    let student = students.find(element=>element.id === id);

    res.render('student', {student});
    // or     res.render('student', {student: student});
})


// app.get('/contact-me', (req,res)=>
// {
//     res.redirect(301,'/contact');
// })


app.listen(port,host, ()=>{
    console.log('The server is running at port', port);
});