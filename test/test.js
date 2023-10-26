// const os = require('os');
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.cpus());
// console.log(os.freemem());
// console.log(os.getPriority());
// console.log(os.platform());
// console.log(os.release());
// console.log(os.tmpdir());
// console.log(os.totalmem());
// console.log(os.userInfo());
// console.log(os.machine());
// console.log(os);

// function calling form sepreat js file
// const call_function = require('./models/CallFunctions');
// console.log(call_function.add(12,32));
// // second way
// const {add, sub, mul, dev} = require('./models/CallFunctions');
// console.log(add(12,90));
// console.log(sub(12,32));
// console.log(mul(12,32));
// console.log(dev(12, 32));
// console.log("testing combination of function = "+ mul(12,add(12,sub(32,dev(15,3)))) );


const fs = require('fs');

//one way to set path of file
// fs.readFile('./models/readFile.txt', 'utf-8' ,(err, data) => {
//     if (err) throw err;
//     console.log(data);
//     // console.log(data.toString()); if we are not using "utf-8"

// })


const path = require('path');

// second way to set file path
fs.readFile(path.join(__dirname, 'models/readFile.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log("read successfully = ", data);
})

// console.log("hello data ....");

//write new file in jaga
fs.writeFile(path.join(__dirname, 'models/writeFile.txt'), 'and i am your computer', (err) => {
    if (err) throw err;
    console.log("write fully");
})
// to modify or add new data in existing or non existing file
fs.appendFile(path.join(__dirname, 'models/writeFile.txt'), ' you are very handsome boy', (err) => {
    if (err) throw err;
    console.log("append fully");
})
// renaming file 
fs.rename(path.join(__dirname, 'models/NewWriteFile.txt'), path.join(__dirname, 'models/writeFile.txt'), (err) => {
    if (err) throw err;
    console.log("append fully");
})





//this is the error which catching method we will 
process.on('uncaughtException', err => {
    console.log(`there was an error in ${err}`);
    process.exit(1);
})


