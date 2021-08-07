import express from 'express';
import router from './controllers/routes.js';

const app = express();

app.use(express.json());

const PORT = 8000;

app.use(logger);

app.use('/api', router);

function logger(req, res, next){
  console.log({
    "METHOD" : req.method,
    "Request URL" : `http://${req.headers.host}${req.url}`,
    "Request DATA" : req.body
  });
  next();
}



app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
    //console.log('http://localhost:%s', PORT);
  //  console.log('url:%s');
})
