const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');


const fileOps = async () => {
    try {
        
        let data = await fsPromise.readFile(path.join(__dirname, 'models/readFile.txt'), 'utf-8');
        console.log(data);
        if (fs.existsSync(path.join(__dirname, 'models/NewWriteFile.txt'))) {
            await fsPromise.unlink(path.join(__dirname, 'models/NewWriteFile.txt'));
        }
        await fsPromise.writeFile(path.join(__dirname, 'models/writeFile.txt'), data);
        await fsPromise.appendFile(path.join(__dirname, 'models/writeFile.txt'), `i am your computer \nYour are master `);
        await fsPromise.rename(path.join(__dirname, 'models/writeFile.txt'), path.join(__dirname, 'models/NewWriteFile.txt'));

    } catch (error) {
        console.log(error);
    }
}

// fileOps();



const rs = fs.createReadStream(path.join(__dirname, 'models/readFile.txt'), { encoding: 'utf-8' })

const ws =  fs.createWriteStream(path.join(__dirname, 'models/writeFile.txt'))
// first way
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

// second way

rs.pipe(ws);