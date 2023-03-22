const MessageBox = require('../models/messageBoxModel');
const User = require('../models/userModel');

module.exports.messageBox = async (req,res,next)=>{
    const {userId} = req.body;
    const UserCheck = User.findById({id:userId});

    if(UserCheck.length > 0){
        const boxs = MessageBox.find({
            user:userId
        })
        .then(async data=>{
            if(data){
                const activeBox = data.map(box=>{
                    if(box.isActive){
                        return box
                    }
                });

                if(activeBox.length > 0){
                    return res.json({ status: true, user: userId, box:activeBox,isNew: false });
                }else{

                    const newBox = await MessageBox.create({
                        user:userId,
                        isActive:true,
                        messages:[]
                    })
                    .then(result=>{
                        if(result){
                            return res.json({ status: true, user: userId, box:result,isNew: true });
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        return res.json({ status: false, user: userId, box:undefined,isNew: undefined });
                    })


                }

            }
        })
        .catch(err=>{
            console.log(err)
            return res.json({ status: false, user: userId, box:undefined,isNew: undefined });
        })


    }
}

