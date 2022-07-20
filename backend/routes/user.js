const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/", userCtrl.createUser);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
