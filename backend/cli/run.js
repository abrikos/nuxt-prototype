import * as dotenv from 'dotenv';
dotenv.config();
const yargs = require('yargs');
const argv = yargs
  .argv;

function getAllScripts(){
  const fs = require('fs');
  const dir = fs.readdirSync(__dirname + '/scripts');
  const scripts = (dir.map(d=>d.replace(/.js$/,'')))
  console.log('Available scripts:')
  for(const s of scripts){
    const script = require(`./scripts/${s}`);
    console.log('\x1b[36m%s\x1b[0m',s, ':', script.default.short);
  }
}


if(argv.s){
  try {
    const script = require(`./scripts/${argv.s}`)
    if (argv.h) {
      console.log(script.default.short)
      console.log(script.default.help)
    }
    script.default.run(argv);
  }catch (e) {
    console.log(e.message)
    getAllScripts();
  }
}else{
  console.log('Usage: run.sh -s <script>')
  getAllScripts();

}

