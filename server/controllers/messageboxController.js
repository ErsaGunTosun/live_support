const MessageBox = require('../models/messageBoxModel');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');

module.exports.messageBox = async (req, res, next) => {
    console.log("user req box");
    const userId = req.params.id;
    const UserCheck = await User.find({ _id: userId });
    if (UserCheck.length > 0) {
        const boxs = MessageBox.find({
            user: userId
        })
            .then(async data => {
                if (data) {
                    const activeBox = [];
                    data.map(box => {
                        if (box.isActive) {
                            activeBox.push(box);
                        }
                    });
                    console.log("active box", activeBox);
                    if (activeBox.length > 0) {
                        console.log("old box");
                        return res.json({ status: true, user: userId, box: activeBox[0], isNew: false });
                    } else {
                        console.log("new box");
                        const newBox = await MessageBox.create({
                            user: userId,
                            isActive: true,
                            messages: [],
                        })
                            .then(data => {
                                if (data) {
                                    console.log(data);
                                    return res.json({ status: true, user: userId, box: data, isNew: true });
                                } else {
                                    console.log(err)
                                    return res.json({ status: false, user: userId, box: undefined, isNew: undefined });
                                }

                            })
                            .catch(err => {
                                console.log(err);
                                return res.json({ status: false, user: userId, box: undefined, isNew: undefined });
                            })
                    }

                }
            })
            .catch(err => {
                console.log(err)
                return res.json({ status: false, user: userId, box: undefined, isNew: undefined });
            })


    }
}

module.exports.addMessageToBox = async (req, res, next) => {
    try {
        const { from, to, message, time } = req.body;

        let messageBox = await MessageBox.find({ _id: to })
            .then(async (rstl) => {
                if (rstl.length > 0) {
                    let box = rstl[0];
                    if (box.isActive) {
                        let msg = {
                            sender: from,
                            time: time,
                            message: { text: message }
                        }
                        box.messages.push(msg);
                        MessageBox.findOneAndUpdate({ _id: box._id }, { messages: box.messages })
                            .then(newbox => {
                                res.json({ msg: "Message added successfully." });
                            })
                            .catch(err => {
                                res.json({ msg: "Failed to add message to the database" });
                            })

                    }
                } else {
                    res.json({ msg: "Failed to add message to the database" });
                }
            })
            .catch(err => {
                console.log(err);
                res.json({ msg: "Failed to add message to the database" });
            })


    } catch (ex) {
        next(ex);
    }





}

module.exports.getMessagesToBox = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const findBox = await MessageBox.find({ _id: to });

        if (findBox.length > 0) {
            let box = findBox[0];
            const projectedMessages = box.messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    time: msg.time
                };
            });
            res.json(projectedMessages);
        }
    } catch (ex) {
        next(ex);
    }
}

module.exports.addRate = async (req, res, next) => {
    const { to, from, rate } = req.body;
    MessageBox.findOneAndUpdate({ _id: to }, { rate: rate.toString(), isActive: false }, { returnNewDocument: true })
        .then(newbox => {
            console.log("new box rate", newbox);
            res.json({ status: true, msg: "Box rated successfully.", box: newbox });
        })
        .catch(err => {
            console.log(err);
            res.json({ status: false, msg: "Failed to rate box." });
        })
}


module.exports.acceptBox = async (req, res, next) => {
    const { to, admin } = req.body;
    const adminData = await Admin.find({ _id: admin });
    console.log("0")
    if (adminData.length > 0) {
        console.log("1")
        const boxData = await MessageBox.find({ _id: to });
        if (boxData.length > 0) {
            console.log("2")
            const box = boxData[0];
            if (box.isActive) {
                console.log("3")
                console.log("admin", adminData[0]._id);
                MessageBox.findOneAndUpdate({ _id: box._id }, { adminastor: adminData[0]._id, }, {
                    returnNewDocument: true
                }
                )
                    .then(newbox => {
                        console.log("new box", newbox);
                        res.json({ status: true, msg: "Box accepted successfully.", box: newbox });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({ status: false, msg: "Failed to accept box.", box: undefined });
                    })
            }
        }
    }
}

module.exports.getBoxs = async (req, res, next) => {
    try {
        const { id, userID } = req.params;
        const admin = await Admin.find({ _id: id });

        if (admin.length > 0) {

            const currentUser = await User.find({ _id: userID });
            if (currentUser.length > 0) {

                const boxs = await MessageBox.find({ user: userID });
                if (boxs.length > 0) {

                    res.status(200).json({ status: true, boxs: boxs });
                }
                else {
                    res.status(200).json({ status: true, boxs: [] });
                }
            }
        }
        else {
            res.status(404);
        }

    }
    catch (ex) {

    }

}


module.exports.getFinishBox = async (req, res, next) => {
    try {
        const { id } = req.params;

        const admin = await Admin.find({ _id: id });
        const users = await User.find();
        console.log("sa")
        if (admin.length > 0) {
            let results = [];
            let box = {};
            const boxs = await MessageBox.find({ adminastor: id });
            if (boxs.length > 0) {
                for (let i = 0; i < boxs.length; i++) {
                    box.box = boxs[i];
                    users.map(item => {
                        if (item._id.toString() === boxs[i].user.toString()) {
                            box.user = item;
                        }
                    })
                    results.push(box);
                }
                res.status(200).json({ status: true, boxs: results });
            }
            else {
                res.status(200).json({ status: true, boxs: [] });
            }


        } else {
            res.status(404);
        }
    }
    catch (ex) {
        next(ex);
    }


}