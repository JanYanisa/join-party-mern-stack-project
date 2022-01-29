import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let parties

export default class PartiesDAO {
  static async injectDB(conn) {
    if (parties) {
      return
    }
    try {
      parties = await conn.db(process.env.RESTREVIEWS_NS).collection("parties")
      console.log("connect to parties db")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addParty(partyName,
    user_email, startDateTime, endDateTime, cap, date
     ) {

    try {
      const partyDoc = { name: partyName,
          createdBy: user_email,
          start: startDateTime,
          end: endDateTime,
          maxCap: cap, 
          date: date 
        }

      return await parties.insertOne(partyDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateParty(
    partyId,
    userId,
    partyName,
    startDateTime,
    endDateTime,
    cap,
    date) {
    try {
      const updateResponse = await parties.updateOne(
        { 
          createdBy:userId,
          _id: ObjectId(partyId)
        },
        [
          { $set: { name: {$cond:
            {
            if: {
              $eq: [partyName, null]
            },
            then: '$name',
            else: partyName,
            }} 
            }
           },
           { $set: { start: {$cond:
            {
            if: {
              $eq: [startDateTime, null]
            },
            then: '$start',
            else: startDateTime,
            }} 
            }
           },
           { $set: { end: {$cond:
            {
            if: {
              $eq: [endDateTime, null]
            },
            then: '$end',
            else: endDateTime,
            }} 
            }
           },
          { $set: { maxCap: {$cond:
            {
            if: {
              $eq: [cap, null]
            },
            then: '$maxCap',
            else: cap,
            }} 
            }},
          { $set: { date: date  }}
        ]
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteParty(partyId, userEmail) {

    try {
      const deleteResponse = await parties.deleteOne({
        _id: ObjectId(partyId),
        createdBy: userEmail,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async getParty() {
    let cursor
    
    try {
      cursor = await parties.find()
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { partiesList: [], totalNumParties: 0 }
    }

    try {
      const partiesList = await cursor.toArray()
      const totalNumParties = await cursor.count()

      return { partiesList, totalNumParties }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { partiesList: [], totalNumParties: 0 }
    }
  }

  static async getPartyByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "joined",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$party_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                          { $project: { party_id: 0, _id: 0 } }
                      ],
                      as: "members",
                  }
              },
          ]
      return await parties.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getPartyByID: ${e}`)
      throw e
    }
  }

  static async getPartyMember() {
    try {
      const pipeline = [
              {
                $lookup: {
                  from: "joined",
                  let: {
                      id: "$_id",
                  },
                  pipeline: [
                      {
                          $match: {
                              $expr: {
                                  $eq: ["$party_id", "$$id"],
                              },
                          },
                      },
                      {
                          $sort: {
                              date: -1,
                          },
                      },
                      { $project: { party_id: 0, _id: 0, date: 0 } }
                  ],
                  as: "members",
              }
              }
          ]
      const cursor = await parties.aggregate(pipeline);
      const docsList = await cursor.toArray();
      // console.log('OUTPUT: ', JSON.stringify(docsList));
      return docsList
    } catch (e) {
      console.error(`Something went wrong in getPartyMember: ${e}`)
      throw e
    }
  }


}