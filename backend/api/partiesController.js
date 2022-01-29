import JoinDAO from "../dao/joinDao.js"
import PartiesDAO from "../dao/partiesDao.js"


export default class PartiesController {
  static async apiPostParty(req, res, next) {
    try {
      const partyName = req.body.party_name
      const startDateTime = (req.body.start_time? new Date(req.body.start_time): new Date("2022-01-30T20:00:00"))
      const endDateTime = (req.body.end_time? new Date(req.body.end_time): new Date("2022-01-30T22:00:00"))
      const user_email = req.body.user_email

      const cap = (req.body.cap? parseInt(req.body.cap): 5)
      const date = new Date()

      const PartiesResponse = await PartiesDAO.addParty(
        partyName,
        user_email,
        startDateTime,
        endDateTime,
        cap,
        date
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateParty(req, res, next) {
    try {
      const partyId = req.body.party_id
      const partyName = (req.body.party_name? req.body.party_name: null)
      const startDateTime = (req.body.start_time? new Date(req.body.start_time): null)
      const endDateTime = (req.body.end_time? new Date(req.body.end_time): null)
      const cap = (req.body.cap? parseInt(req.body.cap): null)
      const date = new Date()

      const partyResponse = await PartiesDAO.updateParty(
        partyId,
        req.body.user_id,
        partyName,
        startDateTime,
        endDateTime,
        cap,
        date
      )

      var { error } = partyResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (partyResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteParty(req, res, next) {
    try {
      const partyId = req.query.party_id
      const userEmail = req.body.user_email
      // console.log(partyId)
      const partyResponse = await PartiesDAO.deleteParty(
        partyId,
        userEmail,
      )
      if(partyResponse.deletedCount === 1){
        const deleteMemberResponse = await JoinDAO.deleteJoinsByOwner(
          partyId
        )
      }
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetParty(req, res, next) {
    
    const { partiesList, totalNumParties } = await PartiesDAO.getParty()
    let response = {
      parties: partiesList,
      total_results: totalNumParties,
    }
    res.json(response)
  }

  static async apiGetPartyID(req, res, next) {
    try {
      let id = req.params.id || {}
      let party = await PartiesDAO.getPartyByID(id)
      if (!party) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(party)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
    // res.json({party_id: req.params.id})
  }

  static async apiGetPartyMember(req, res, next) {

    try {

      let parties = await PartiesDAO.getPartyMember()
      // if (!party) {
      //   res.status(404).json({ error: "Not found" })
      //   return
      // }
      res.json(parties)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}