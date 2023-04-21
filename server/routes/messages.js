const { addMessage, getMessages} = require("../controllers/messageController");
const {messageBox,addMessageToBox,getMessagesToBox,acceptBox,addRate,getBoxs,getFinishBox} = require('../controllers/messageboxController');
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

router.post("/box/addmsg/", addMessageToBox);
router.post("/box/getmsg/", getMessagesToBox);
router.post("/box/accept/", acceptBox);
router.post("/box/rate/", addRate);
router.get("/box/finish/:id", getFinishBox);
router.get("/box/:id", messageBox);
router.get("/boxs/:id/:userID", getBoxs);



module.exports = router;
