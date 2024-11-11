const express = require("express");
const router = express.Router();

const { login, register, dashboard, getAllUsers } = require("../controllers/user");
const { uploadInfo, getPatients } = require("../controllers/patient");
const authMiddleware = require('../middleware/auth')

router.route("/upload-info").post(uploadInfo);
router.route("/patients-per-month").get(getPatients);


router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);


module.exports = router;