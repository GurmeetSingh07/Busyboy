const express = require("express");
const app = express();
const multer = require("multer");
const hbs = require("hbs");
const path = require("path");

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/upload", upload.single("images"), (req, res, next) => {
  console.log("hello");
  var fileinfo = req.file;
  res.send(fileinfo);
  console.log(fileinfo);
});

app.post("/uploads", upload.array("images", 5), (req, res, next) => {
  var fileinfo = req.files;
  res.send(fileinfo);
});
app.listen(3000, function () {
  console.log(" listening ");
});
