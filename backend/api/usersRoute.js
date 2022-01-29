import express from "express";
import UsersCtrl from "./usersController.js";
const router = express.Router();

// router
// .route("/")
// .get(
//     (req, res) => {
//     res.send("hello world, This is users route!!");
// }
// );

router
.route("/")
.post(UsersCtrl.apiPostUsers)
.put(UsersCtrl.apiUpdateUsers)

router
.route("/auth")
.post(UsersCtrl.apiPostUsersByMail);

router
.route("/auth/reg")
.post(UsersCtrl.apiPostUsersByMailGetMail);

export default router;