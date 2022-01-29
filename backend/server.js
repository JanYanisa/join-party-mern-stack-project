import express from "express";
import cors from "cors";
import parties from "./api/partiesRoute.js"
import users from "./api/usersRoute.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/parties", parties);
app.use("/api/v1/users", users);
app.use("*", (req, res) => {
    res.status(404).json({ error: "not found"})
});



export default app;