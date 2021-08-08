import express from 'express';
import router from './controllers/routes.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/api', router);

app.use(logger);

function logger(req, res, next){

  const apiUrl = `http://${req.headers.host}${req.url}`;

  console.log({
    "METHOD" : req.method,
    "Request URL" : apiUrl,
    "Request DATA" : req.body
  });
  next();
}



app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
})
