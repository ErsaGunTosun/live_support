const { login,createAdmin,getAllUsers,getUser,checkuser } = require("../controllers/adminController");
const router = require("express").Router();


router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/user/:id/:userId", getUser);
router.get("/checkuser/:id/:userID", checkuser);


module.exports = router;