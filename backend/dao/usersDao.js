import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let users

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users")
      console.log("connect to users db")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addUser(user_email, password, date) {
   try {
     const userDoc = { user_email: user_email,
      password: password, 
      date: date
       }

     return await users.insertOne(userDoc)
   } catch (e) {
     console.error(`Unable to post review: ${e}`)
     return { error: e }
   }
 }

 static async updateUserPw(
  user_email,
  new_password,
  date) {
  try {
    const updateResponse = await users.updateOne(
      { 
        user_email: user_email
      },
      [
        { $set: { password: new_password  }},
        { $set: { date: date  }}
      ]
    )

    return updateResponse
  } catch (e) {
    console.error(`Unable to change password: ${e}`)
    return { error: e }
  }
}

static async getUserByMail(user_email) {
  let cursor
  try {
    cursor = await users.find({ user_email: user_email})
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`)
  }

  try {
    const usersList = await cursor.toArray()
    return usersList
  } catch (e) {
    console.error(
      `Unable to convert cursor to array or problem counting documents, ${e}`,
    )
  }
}


}