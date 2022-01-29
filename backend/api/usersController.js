import UsersDAO from "../dao/usersDao.js"

export default class UsersController {
    static async apiPostUsers(req, res, next) {
      try {
        const date = new Date()
  
        const PartiesResponse = await UsersDAO.addUser(
          req.body.user_email,
          req.body.password,
          date
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }

    static async apiUpdateUsers(req, res, next) {
        try {
          const date = new Date()
    
          const userResponse = await UsersDAO.updateUserPw(
            req.body.user_email,
            req.body.new_password,
            date
          )
    
          var { error } = userResponse
          if (error) {
            res.status(400).json({ error })
          }
    
          if (userResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update password",
            )
          }
    
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }

      static async apiPostUsersByMail(req, res, next) {
        try {
          let user = await UsersDAO.getUserByMail(req.body.email)
          // console.log(user[0])
          return (user[0]? res.json(user[0]): res.status(404).json({ message: "Username is invalid" }))
        }
         catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }

      static async apiPostUsersByMailGetMail(req, res, next) {
        try {
          let user = await UsersDAO.getUserByMail(req.body.email)
          // console.log(user[0])
          return (user[0]? res.json({user_email: user[0].user_email}): res.json({ message: "Username is invalid" }))
        }
         catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
}