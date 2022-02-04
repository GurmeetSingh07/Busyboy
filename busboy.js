const express = require("express");
const app = express();
const busboy = require("connect-busboy");
const fs = require("fs");
const busboy1 = require("busboy");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  busboy({
    highWaterMark: 1 * 1024 * 1024,
  })
);

const uploadPath = path.join(__dirname, "./uploads");

app.post("/upload", (req, res, next) => {
  req.pipe(req.busboy);

  req.busboy.on("file", (fieldname, file, filename) => {
    let a = `${path.join(
      uploadPath,

      filename.filename
    )}`;

    console.log(`Upload of '${a}' started`);

    const fstream = fs.createWriteStream(a);

    fstream
      .on("open", function () {
        file.pipe(fstream);
      })
      .on("error", function (err) {
        console.log(err);
        console.log("error2");
      })
      .on("finish", function () {
        console.log("finish");
      });

    fstream.on("close", () => {
      console.log(`Upload of '${filename.filename}' finished`);
      res.send("completed");
    });
  });
});
app.listen(3000, function () {
  console.log("code is working");
});
