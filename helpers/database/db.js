const mongoose = require('mongoose')
const MONGO_URI = "mongodb+srv://brkkaliQA:bK286286@cluster0-aa0zn.mongodb.net/MovieAPI?retryWrites=true&w=majority"

const connectDatabase = () => {

    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
   
    mongoose.connect(MONGO_URI, { 
        useNewUrlParser: true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true 
    })
        .then(() => {
            console.log('MongoDb Connection Successful')
        })
        .catch(err => {
            console.error(err)
        })
};
mongoose.Promise=global.Promise;
module.exports = connectDatabase;