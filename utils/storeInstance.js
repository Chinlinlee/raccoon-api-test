const fs = require("fs");
const { config } = require('../config/config');
const request = require('request-compose').extend({
    Request: {
        multipart: require('request-multipart')
    }
}).client;

async function storeInstance(filename) {
    let stream = fs.createReadStream(filename);
    let stowURL = new URL(`/${config.DICOMwebServer.stowPrefix}/studies`, config.DICOMwebServer.baseUrl);
    
    let response = await request({
        method: "POST",
        url: stowURL.href,
        headers: {
            "Content-Type": "multipart/related; type=\"application/dicom\""
        },
        multipart: [
            {
                "Content-Type": "application/dicom",
                "Content-Disposition": `attachment; filename="${filename}"`,
                body: stream
            }
        ],
        timeout: 300000
    });
    return response;
}

module.exports = {
    ...module.exports,
    storeInstance: storeInstance
};