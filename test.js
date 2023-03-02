const fs = require('fs');
let data = [];
//stream estr.json
const readStream = fs.createReadStream('estr.json');
readStream.on('data', (chunk) => {
  data.push(chunk.toString());
}).on('end', () => {
  console.log('end');
}).on('error', (err) => {
  console.log(err);
}).on('close', () => {
  console.log('close');
  process(data);
});

function process(data) {
  console.log(typeof data);
  let str = data.join('');
  const json = JSON.parse(str);
  console.log(typeof json);
}
