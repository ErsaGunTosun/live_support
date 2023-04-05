const { login,createAdmin } = require("../controllers/adminController");
const router = require("express").Router();


router.post("/login", login);


module.exports = router;