const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const MessageBox = require('../models/messageBoxModel');
const bcrypt = require("bcrypt");


module.exports.login = async (req, res) => {
    const { email, password, isRemember } = req.body;
    if (email && password) {
        let adminData = await Admin.find({ email: email });
        if (adminData.length > 0) {
            const passwordCheck = await bcrypt.compare(password, adminData[0].password);
            if (passwordCheck) {
                res.status(200).json({ status: true, admin: adminData[0] })

            } else {
                res.status(200).json({ status: false, message: "Wrong password" });
            }
        } else {
            res.status(200).json({ status: false, message: "Email not found" });
        }

    }
}

module.exports.createAdmin = async (req, res) => {
    let password = await bcrypt.hash(req.body.password, 10);
    const admin = await Admin.create({
        name: req.body.name,
        profil_pic: req.body.pic,
        password: password,
        email: req.body.email,
        phone_number: req.body.phone_number,
        status: {
            rank: req.body.rank,
            isOnline: false,
            isLogin: false,
            isBanned: false,
            isDeleted: false,
        },
        messageBoxs: [],
        login_time: {
            last_login: new Date(),
            last_logout: new Date(),
        },
        tags: [],
        ip: req.body.ip,
        ip_list: [],
        location: req.body.location,
        location_list: [],
        lang: req.body.lang,
        langs: [],
        platform: req.body.platform,
        agent: req.body.userAgent,
    })

    if (admin) {
        res.status(200).json({ status: true, admin: admin });
    } else {
        res.status(200).json({ status: false, message: "Failed to create admin" });
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const admminId = req.params.id;
        if (admminId) {
            const Check = await Admin.find({ _id: admminId });
            if (Check.length == 0) {
                return res.status(200).json({ status: false, message: "Admin not found" });
            } else {
                let resultData = [];
                const users = await User.find();

                for (let i = 0; i < users.length; i++) {
                    const box = await MessageBox.find({ user: users[i]._id,isActive:true });
                    if(box.length > 0){
                        const projectedMessages = box[0].messages.map((msg) => {
                            return {
                                fromSelf: msg.sender.toString() === users[i]._id.toString(),
                                message: msg.message.text,
                            };
                        });
                        let data = {
                            user: users[i],
                            box: {
                                messages: projectedMessages,
                                details: box,
                            },
                        };
                        resultData.push(data);
                    }

                };
       
            
                return res.status(200).json({ status: true, users: resultData });

            }
        }


    } catch (ex) {
        next(ex);
    }
};