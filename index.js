const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const route = require('./routes/api');

//set up express app
const app = express();

//connect to mongodb
mongoose.set('useNewUrlParser', true); //fix deprecation warnings for {useNewUrlParser: true} 
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/ninjadb');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false); //use findOneAndUpdate() & findOneAndDelete() instead

app.use(express.static('public'));
app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));
// app.use('/api', route);

//error handling
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
})


//Listen for request
app.listen(process.env.port || 4000, () => {
    console.log('listening for requests')
});