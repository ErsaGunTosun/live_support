const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    name:{
        type:String,
        required:true,
        min:3,
    },
    names:{
        type:Array,
        required:false
    },
    email:{
        type:String,
        required:true,
    },
    emails:{
        type:Array,
        required:false
    },
    phone_number:{
        type:String,
        required:true,
        min:8,
    },
    status:{
        type:Object,
        required:true,
    },
    ip:{
        type:String,
        required:true,

    },
    ip_list:{
        type:Array,
        required:false
    },
    location:{
        type:Object,
        required:true
    },
    location_list:{
        type:Array,
        required:true
    },
    lang:{
        type:String,
        required:true
    },
    langs:{
        type:Array,
        required:true,
    },
    platform:{
        type:String,
        required:true
    },
    agent:{
        type:String,
        required:true
    },
    login_time:{
        type:Object,
        required:true
    },
    notes:{
        type:Array,
        required:false
    },
    tags:{
        type:Array,
        required:false,
    }

},
{
    timestamps: { createdAt: 'createdAt' },
    toJSON: {
        minimize: false,
    }
});


module.exports = mongoose.model("Users",userSchema);