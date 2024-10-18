const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
dotenv.config()
const app = express()
const port = process.env.Port || 5000;
const authRoute = require("./routes/authRoute")
const postRoute = require("./routes/postRoute")

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/auth",postRoute)

connectDB()

app.use("/",(req,res)=>{
    res.send("mongodb platform api connected")
})

app.listen(port,()=>{
    console.log(`server started at ${port}`)
})

