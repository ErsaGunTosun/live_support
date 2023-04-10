const { addMessage, getMessages} = require("../controllers/messageController");
const {messageBox,addMessageToBox,getMessagesToBox,acceptBox,addRate} = require('../controllers/messageboxController');
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

router.post("/box/addmsg/", addMessageToBox);
router.post("/box/getmsg/", getMessagesToBox);
router.post("/box/accept/", acceptBox);
router.post("/box/rate/", addRate);
router.get("/box/:id", messageBox);


module.exports = router;
