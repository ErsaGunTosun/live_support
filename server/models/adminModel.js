const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        min: 3,
    },
    profil_pic: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
        min: 8,
    },
    status: {
        type: Object,
        required: true,
    },
    messageBoxs: {
        type: Array,
        required: false,
    },
    login_time: {
        type: Object,
        required: true
    },
    tags: {
        type: Array,
        required: false,
    },
    ip: {
        type: String,
        required: true,

    },
    ip_list: {
        type: Array,
        required: false
    },
    location: {
        type: Object,
        required: true
    },
    location_list: {
        type: Array,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    langs: {
        type: Array,
        required: true,
    },
    platform: {
        type: String,
        required: true
    },
    agent: {
        type: String,
        required: true
    },
},
    {
        timestamps: { createdAt: 'createdAt' },
        toJSON: {
            minimize: false,
        }
    });


module.exports = mongoose.model("Admins", AdminSchema);