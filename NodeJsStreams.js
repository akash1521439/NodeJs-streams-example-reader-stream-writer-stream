var fs = require('fs');

var data = '';
//reader stream
var readerStream = fs.createReadStream('myfile.txt',{
    encoding:'utf-8',
    highWaterMark:5 //Chunk size
});
readerStream.on('data',function(chunk){
    console.log(chunk);
    data +=chunk;
})
readerStream.on('end',function(){
    console.log("End data "+ data);
})
readerStream.on('error',function(err){
    console.log(err.stack);
})
console.log("Reading Program ended");

//Writer stream
var writableData = "I am writing stream";
var writerStream = fs.createWriteStream("output.txt","utf-8");
writerStream.write(writableData);
//writerStream.end();
writerStream.on('finish',function(){
    console.log("writing finish");
})
writerStream.on('error',function(err){
    console.log(err.stack);
})

//Copy reader stream to writer stream
readerStream.pipe(writerStream);
writerStream.end();
console.log("Program ended");