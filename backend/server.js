const Express = require('express')
const mongoose= require('mongoose')
require('dotenv').config()
const cors=require('cors')
const bodyparser=require('body-parser')
const AuthRoute = require('./routes/authRoute')
const authMiddleware = require('./middleware/authMiddleware');


const app=Express()
const PORT=process.env.PORT
//middleware
app.use(cors())
app.use(bodyparser.json())

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        app.listen(PORT,()=>
        {
            console.log(`Successfully connected to DB ${PORT}`)
        })
    })
    .catch((err)=>
    {
        console.log(err)
    }
    )

app.use('/api/auth',AuthRoute)
app.use('/api/jobs',JobRoute)

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Handle JSON parsing error
      return res.status(400).json({ message: 'Invalid JSON' });
    }
    next();
  });


