if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const multer = require('multer')
const User = require('./User')
const File = require('./Files')
var PORT = 8080 || process.env.PORT

// const upload = multer({ dest: 'uploads/'})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      //cb(null, uuid.v4() + path.extname(file.originalname));
      cb(null, file.originalname );
    }
  })
  
var upload = multer({ storage: storage })

//connects to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
//Loads Passport model
const initializePassport = require('./passport')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
  
var users = [] 


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({secret: process.env.session, resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAutheticated,  (req,res) => {
    res.render('index.ejs')
})
app.get('/login', checkNotAuthenticated, (req,res) => {
    res.render('login.ejs')   
})
app.get('/signup', checkNotAuthenticated, (req,res) => {
    res.render('signup.ejs')   
})

app.post('/', upload.single('myFile'), function (req, res, next){
    //const { fileName } = req.file.filename;
    try {
        const newFile = new User({
            fileName: req.file.filename
        });
        newFile.save();
        res.redirect('./')
        console.log(newFile)
    }
    catch {
        res.redirect('./')
        console.log("error")
    }  
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
//register account and submits collection to MongoDB cluster
app.post('/signup', checkNotAuthenticated, async (req,res) => {
    const { email, password } = req.body;
    try{
        const newUser = new User({
            email,
            password
        });
        const hashedPassowrd = await bcrypt.hash(newUser.password, 10)
        newUser.password = hashedPassowrd;
        newUser.save();
        res.redirect('/login')
        console.log(newUser)
    } catch {
        res.redirect('/signup')
        console.log("error")
    }
})
//middleware ensures you cannot go to certain pages if logged in and vice versa
function checkAutheticated(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
app.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
  })
  
app.listen(PORT, function(err){ 
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}) 