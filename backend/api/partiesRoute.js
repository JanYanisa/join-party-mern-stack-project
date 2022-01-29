import express from "express";
import PartiesCtrl from "./partiesController.js";
import JoinCtrl from "./joinController.js";

const router = express.Router();

// router
// .route("/")
// .get(
//     (req, res) => {
//     res.send("hello world, This is parties route!!");
// }
// );

router
.route("/")
.post(PartiesCtrl.apiPostParty)
.put(PartiesCtrl.apiUpdateParty)
.delete(PartiesCtrl.apiDeleteParty)
.get(PartiesCtrl.apiGetPartyMember);

router
.route("/:id")
.get(PartiesCtrl.apiGetPartyID);

// router
// .route("/:id/:owner_id")
// .get(PartiesCtrl.apiGetPartyIDOwner);

router
.route("/join")
.post(JoinCtrl.apiPostJoin)
.delete(JoinCtrl.apiDeleteJoinByMember);

export default router;