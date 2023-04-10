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
                        res.json({ status: true, msg: "Box accepted successfully." });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({ status: false, msg: "Failed to accept box." });
                    })
            }
        }
    }
}