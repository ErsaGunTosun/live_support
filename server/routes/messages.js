const { addMessage, getMessages} = require("../controllers/messageController");
const {messageBox} = require('../controllers/messageboxController');
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/box/", messageBox);

module.exports = router;
