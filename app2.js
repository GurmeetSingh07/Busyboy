const express = require("express");
const app = express();
const multer = require("multer");

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: filestorage });

app.post("/upload", upload.single("images"), (req, res) => {
  const fileinfo = req.file;
  console.log(fileinfo);
  res.send(fileinfo);
});
app.post("/uploads", upload.array("images", 5), (req, res) => {
  const filein = req.files;
  console.log(filein);
  res.send(filein);
});

app.listen(3000, () => {
  console.log("its working on port 3000");
});
