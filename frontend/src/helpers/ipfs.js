import { create, globSource } from 'ipfs-http-client';
const fs = require('fs');

async function ipfsClient() {
  const ipfs = await create({
    host: '127.0.0.1',
    port: 5001,
    protocol: 'http',
  });
  return ipfs;
}

// Create Directory
async function createDir(userAddress) {
  //질문,답변 디렉토리 생성
  const ipfs = await ipfsClient();
  const questionDir = await ipfs.files.mkdir(
    '/root/' + userAddress + '/question',
    {
      parents: true,
    }
  );
  const answerDir = await ipfs.files.mkdir('/root/' + userAddress + '/answer', {
    parents: true,
  });
  console.log(`ipfs: ${ipfs}`);
  console.log(`qusetionDir: ${questionDir}`);
  console.log(`answerDir: ${answerDir}`);
}

// Upload file
async function uploadFile(userAddress, content) {
  const ipfs = await ipfsClient();
  // let qFile = fs.readFileSync('./test.json');
  await ipfs.files.write(
    '/root/' + userAddress + '/question/questiontest.json',
    content,
    { create: true }
  );

  const fileStat = await ipfs.files.stat(
    '/root/' + userAddress + '/question/questiontest.json'
  );
  console.log('file: ', fileStat);
}

// Read file
async function getData(hash) {
  //해시값 입력해서 파일내용 읽기
  let ipfs = await ipfsClient();
  let asyncitr = ipfs.cat(hash);

  for await (const itr of asyncitr) {
    let data = Buffer.from(itr).toString();
    console.log(data);
  }
}

// View Contents of a Directory
async function viewDirectory(userAddress) {
  const ipfs = await ipfsClient();
  const viewQuestionDirectory = await ipfs.files.ls(
    '/root/' + userAddress + '/question'
  );
  console.log(viewQuestionDirectory);
  // await ipfs.files.ls('/root/' + userAddress + '/question');

  return viewQuestionDirectory;
}

module.exports = { createDir, uploadFile, getData, viewDirectory };
