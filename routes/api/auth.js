const express = require("express");

const { basedir } = global;

const { auth: ctrl } = require(`${basedir}/controllers`);
const { ctrlWrap } = require(`${basedir}/helpers`);
const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post("/signup", ctrlWrap(ctrl.signup));

router.post("/login", ctrlWrap(ctrl.login));

router.get("/current", auth, ctrlWrap(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrap(ctrl.logout));

module.exports = router;
