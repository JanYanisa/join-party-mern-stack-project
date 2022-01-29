import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let joined

export default class JoinDAO {
  static async injectDB(conn) {
    if (joined) {
      return
    }
    try {
      joined = await conn.db(process.env.RESTREVIEWS_NS).collection("joined")
      console.log("connect to joined db")
    } catch (e) {
      console.error(`Unable to establish collection handles in joinDAO: ${e}`)
    }
  }

  static async addJoin(partyId, date, user_email) {
    try {
      const reviewDoc = { 
          user_email:user_email,
          date: date,
          party_id: ObjectId(partyId) }

      return await joined.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async deleteJoinByMember(partyId, userEmail) {

    try {
      const deleteResponse = await joined.deleteOne({
        party_id: ObjectId(partyId),
        user_email: userEmail
      })
      // console.log(partyId)
      // console.log(userEmail)
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async deleteJoinsByOwner(partyId) {

      if(joined.find({ party_id: ObjectId(partyId)}) === 1){
        try {const deleteResponse = await joined.deleteOne({
          party_id: ObjectId(partyId)
        })
        return deleteResponse
      } catch (e) {
        console.error(`Unable to delete one review: ${e}`)
        return { error: e }
      }
    }
     else {
      try {const deleteResponse = await joined.deleteMany({
        party_id: ObjectId(partyId)
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete one review: ${e}`)
      return { error: e }
      }
    }
  }

}