const multer = require('multer')
const express = require('express')
const app = express();
const path = require('path')
const img="1641549825544world.topo.bathy.200407.3x21600x21600.A2.png"



const uploadUrl =path.join(__filename,"../uploads",img)
console.log(uploadUrl)
const storage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, files, cb) {

        cb(null, Date.now() + files.originalname)
    }
})
const upload = multer({ storage: storage })
app.post("/upload", (req, res) => {
    console.log("done!")
})

app.get("/",(req,res)=>{
    res.send("welcome here")
})
app.get("/view",(req, res) => {
    res.sendFile(uploadUrl)
})

app.listen(3000, (req, res) => {
    console.log("3000!");
})

