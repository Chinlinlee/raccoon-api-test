const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { config } = require('../config/config');
const request = require('request-compose').extend({
    Request: {
        multipart: require('request-multipart')
    }
}).client;

async function storeInstance(iConfig, stream) {
    let stowURL = new URL(`/${iConfig.DICOMwebServer.stowPrefix}/studies`, iConfig.DICOMwebServer.baseUrl);
    // let dicomFilename = path.join(__dirname, "../dicomFiles/2.000000-BRAINSCOUT-01639/1-1.dcm");
    
    let response = await request({
        method: "POST",
        url: stowURL.href,
        headers: {
            "Content-Type": "multipart/related; type=application/dicom"
        },
        multipart: [
            {
                "Content-Type": "application/dicom",
                body: stream
            }
        ]
    });
    console.log(response);
}

(async ()=> {
    let dicomFilename = path.join(__dirname, "../dicomFiles/1.3.6.1.4.1.5962.99.1.3777458795.792694104.1541375783531.2.0.dcm");
    let dicomFileStream = fs.createReadStream(dicomFilename);
    await storeInstance(config, dicomFileStream);
})();


