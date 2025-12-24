if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

console.log(process.env.SECRET);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const Campground = require('./models/campground.js');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { stat } = require('fs');
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const campgrounds = require('./routes/campgrounds.js')
const reviews = require('./routes/reviews.js')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
const users = require('./routes/users.js');
const helmet = require('helmet');
const MongoStore = require('connect-mongo')(session);
const dbUrl = process.env.DB_URL;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbUrl)
.then(() => console.log("DB connected"))
.catch((e) => {
    console.log('DB connection failed', e)
}
)

const secret = process.env.SECRET || 'secret';

const store = new MongoStore({
    url: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 *60,
});

store.on('error', function(e){
    console.log('STORE ERROR', e);
})

const sessionConfig = {
    store:store,
    name: 'session',
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
   }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://cdn.maptiler.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
    "https://code.jquery.com",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://cdn.maptiler.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.maptiler.com",
    "https://ka-f.fontawesome.com",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/ddnvjdoen/",
                "https://images.unsplash.com",
                "https://api.maptiler.com",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



app.use('/', users);
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req,res) => {
    res.render('home');
})

app.get('/', (req,res) => {
    res.redirect('/home');
})

app.all(/(.*)/, (req,res,next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500, message ="Something went wrong"} = err;
    res.status(statusCode).render('error', {statusCode, message, err});
})

app.listen(3000, () => {
    console.log("Server running")
})
