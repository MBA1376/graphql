const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema({
    email : {
        type : String ,
        required : true
    } ,
    password: {
        type : String ,
        required : true
    } ,
    createdEvents : [{
        type : Schema.Types.ObjectId ,
        ref : 'Event'
    }]
});

module.exports = mongoose.model('User' , UserShema);