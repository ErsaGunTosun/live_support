const MessageBox = require('../models/messageBoxModel');
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
                    const activeBox = data.map(box => {
                        if (box.isActive) {
                            return box
                        }
                    });

                    if (activeBox.length > 0) {
                        return res.json({ status: true, user: userId, box: activeBox, isNew: false });
                    } else {

                        const newBox = await MessageBox.create({
                            user: userId,
                            isActive: true,
                            messages: []
                        })
                        if (newBox) {
                            return res.json({ status: true, user: userId, box: newBox, isNew: true });
                        } else {
                            console.log(err)
                            return res.json({ status: false, user: userId, box: undefined, isNew: undefined });
                        }

                    }

                }
            })
            .catch(err => {
                console.log(err)
                return res.json({ status: false, user: userId, box: undefined, isNew: undefined });
            })


    }
}

