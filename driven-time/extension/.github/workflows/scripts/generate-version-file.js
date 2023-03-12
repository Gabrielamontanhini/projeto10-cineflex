const fs = require('fs');

const generatedFileName = 'driven-code-time.json';
const versionReadOfPackageJson = 
  JSON.parse(fs.readFileSync('../package.json')).version;
const apiInfos = { version: versionReadOfPackageJson };
const apiInfosJsonFormat = JSON.stringify(apiInfos);

fs.writeFileSync(generatedFileName, apiInfosJsonFormat);


