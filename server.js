import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser());

// this middleware create a session object to each request:
// req.session
// in this object you can save on the user stuff in the server meaning if you do in your middleware:
// req.session.userName = 'adidi' the user name "adidi" will be save to this user for every request under req.session
// As I told you the only way that the server knows anything about the client is Cookies - so this middlewares using
// the power of cookies and session cookies as explained in the previous lesson
// since i want to save the data on the server (in this case userName = 'adidi') i need to know which user call me to give
// him back the correct data so express-session create a special cookie with some hashed id and this hashed id
// is the key to some data structure(HashMap or in js json) saved in the memory of the server
// so lets take our example since we save to each user (after login or whatever) the key userName
// so the server will create some object in memory something like that:
//  {
//      "afsarfq3fwf": { userName: 'adidi', id: 112, password: 12344},
//      "asfaqwf32f3": { userName: 'ofir'},
//      "dsafsdaqw": { userName: 'danny'},
//      "asf3sdgfsegt": { userName: 'lizet'}
//  }
// every key of that object is basically the key inside the cookie of each user so the server will know to give you
// the right data by the key he will get from the user cookie.
// - the user make request
// - like we told in every request you have also the cookies
//   the server will take the cookie it created to every user (the name of the cookie is the same for all users of course)
//   for the example lets call the cookie sc - so the server will ask give me the content of cookie "sc"
// - in this coneten there is the hashed key the server saves for each user("afsarfq3fwf", "asfaqwf32f3" - look at the json above)
// - the server will take the json from that key and give the user the userName - so cookie with key "afsarfq3fwf" will get "adidi"
// and this is how the server knows who you are !
app.use(
    session({
        secret: 'ofir hubara',
        resave: false,
        saveUninitialized: true
    })
);

app.use(routes);

module.exports = app;

//should be deleted by Zvi
// const port = process.env.PORT || 3001;

// app.listen(port,()=>{
//     console.log(`we are listening to port: ${port}`)
// })
