import JoinDAO from "../dao/joinDao.js"

export default class JoinController {
  static async apiPostJoin(req, res, next) {
    try {
      const partyId = req.body.party_id
      const date = new Date()

      const joinResponse = await JoinDAO.addJoin(
        partyId,
        date,
        req.body.user_email
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteJoinByMember(req, res, next) {
    try {
      const partyId = req.query.party_id
      const userEmail = req.body.user_email
    //   console.log(joinId)
      const joinResponse = await JoinDAO.deleteJoinByMember(
        partyId,
        userEmail,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}