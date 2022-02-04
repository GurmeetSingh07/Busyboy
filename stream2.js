var fs = require("fs");
const path=require("path")
const express=require

const data=path.join(__dirname,"./uploads")

var readerStream = fs.createReadStream(data);

readerStream.on('data', function(chunk) {
  data += chunk;
});


readerStream.on('end',function() {

});

readerStream.on('error', function(err) {
    console.log(err.stack);
 });
 
 console.log("Program Ended");

