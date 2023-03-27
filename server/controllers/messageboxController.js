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

module.exports.addMessageToBox = async (req,res,next) =>{
    try{
        const {from, to, message} = req.body;
        
        let messageBox = await MessageBox.find({_id:to})
        .then(async (rstl)=>{
            if(rstl.length > 0){
                let box = rstl[0];
                if(box.isActive){
                    let msg= {
                        sender: from,
                        message:{text:message}
                    }
                    box.messages.push(msg);
                   MessageBox.findOneAndUpdate({_id:box._id},{messages:box.messages})
                   .then(newbox=>{
                    res.json({ msg: "Message added successfully." });
                   })
                   .catch(err=>{
                    res.json({ msg: "Failed to add message to the database" });
                   })
                    
                }
            }else{
                res.json({ msg: "Failed to add message to the database" });
            }
        })
        .catch(err=>{
            console.log(err);
            res.json({ msg: "Failed to add message to the database" });
        })


    }catch(ex){
        next(ex);
    }





}

module.exports.getMessagesToBox = async (req,res,next) =>{
    try {
        const { from, to } = req.body;
    
        const findBox = await MessageBox.find({_id:to});
        
        if(findBox.length > 0){
            let box = findBox[0];
            const projectedMessages = box.messages.map((msg) => {
                return {
                  fromSelf: msg.sender.toString() === from,
                  message: msg.message.text,
                };
              });
              res.json(projectedMessages);
        }
      } catch (ex) {
        next(ex);
      }
}
