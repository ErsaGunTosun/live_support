const { login,createAdmin,getAllUsers } = require("../controllers/adminController");
const router = require("express").Router();


router.post("/login", login);
router.get("/allusers/:id", getAllUsers);


module.exports = router;