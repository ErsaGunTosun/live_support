const { login,createAdmin,getAllUsers,getUser } = require("../controllers/adminController");
const router = require("express").Router();


router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/user/:id/:userId", getUser);


module.exports = router;