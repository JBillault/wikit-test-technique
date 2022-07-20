const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const { checkToken } = require("../auth/token_validation");

router.post("/", userCtrl.createUser);
router.get("/", checkToken, userCtrl.getAllUsers);
router.get("/:id", checkToken, userCtrl.getOneUser);
router.delete("/:id", checkToken, userCtrl.deleteUser);
router.post("/login", userCtrl.login);

module.exports = router;
