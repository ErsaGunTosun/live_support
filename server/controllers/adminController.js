const Admin = require("../models/adminModel");
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
            res.status(200).json({status: false, message: "Email not found" });
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
        res.status(200).json({status:true,admin:admin});
    } else {
        res.status(200).json({ status:false,message: "Failed to create admin" });
    }
}
