import express from 'express';
import routes from './routes';
import cors from 'cors';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use(routes);

module.exports = app;

//should be deleted by Zvi
// const port = process.env.PORT || 3001;

// app.listen(port,()=>{
//     console.log(`we are listening to port: ${port}`)
// })
