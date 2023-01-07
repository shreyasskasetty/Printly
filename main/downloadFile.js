
const {Storage} = require('@google-cloud/storage');
fs = require('fs');
const storage = new Storage({
    projectId: "printly-3ea29",
    keyFilename: 'firebaseauth.json'
  });


const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
 dir = desktopDir+'/printFiles'
    module.exports = async function(download_url) {
    let bucketName = download_url.split('/')[0];
    let srcFilename = download_url.split('/')[1];
    console.log(download_url)

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    let destFilename=dir+'/'+srcFilename;
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename ,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);

    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );
  }