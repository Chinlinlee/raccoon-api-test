const path = require("path");
const { expect } = require("chai");
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const { multipartDecode } = require("../../utils/message");
const { storeInstance } = require("../../utils/storeInstance");
const { studyCollection } = require("../../utils/study-collection.js");
const glob = require("glob");
const _ = require("lodash");
const { promisify } = require("util");
const imageSize = promisify(require("image-size"));
const uuid = require("uuid");
const fsP = require("fs/promises");

let wsiDICOM = studyCollection[2];
const studyID = "2.16.840.1.113995.3.110.3.0.10118.2000002.278819.649182";
const seriesID = "2.16.840.1.113995.3.110.3.0.10118.2000002.862753";
const instanceID = "2.16.840.1.113995.3.110.3.0.10118.2000002.862753.1";

describe("WADO-RS Retrieve Transaction Thumbnail Resources", () => {

    describe("Retrieve Study's Thumbnail", () => {
        it("should retrieve successful and thumbnail size is 100x100", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/thumbnail`, config.DICOMwebServer.baseUrl);
            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'image/jpeg'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            
            expect(retrieveResponse.status).to.equal(200);
            await checkResponseImageSize(retrieveResponse.data, 100);
        });

        it("should retrieve successful and thumbnail size is 64x64", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/thumbnail`, config.DICOMwebServer.baseUrl);
            retrieveStudyURL.searchParams.append("viewport", "64,64");
            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'image/jpeg'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            
            expect(retrieveResponse.status).to.equal(200);
            await checkResponseImageSize(retrieveResponse.data, 64);
        });
    });

    describe("Retrieve Rendered Study's Series' Thumbnail", ()=> {
        it("should retrieve successful and thumbnail size is 100x100", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/thumbnail`, config.DICOMwebServer.baseUrl);
            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'image/jpeg'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            await checkResponseImageSize(retrieveResponse.data, 100);
        });

        it("should retrieve successful and thumbnail size is 64x64", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/thumbnail`, config.DICOMwebServer.baseUrl);
            retrieveStudyURL.searchParams.append("viewport", "64,64");
            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'image/jpeg'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            await checkResponseImageSize(retrieveResponse.data, 64);
        });
    });

    describe("Retrieve Instance Thumbnail", ()=> {
        it("should retrieve successful and thumbnail size is 100x100", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/instances/${instanceID}/thumbnail`, config.DICOMwebServer.baseUrl);
            console.log(`retrieve from: ${retrieveStudyURL}`);

            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'image/jpeg'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            await checkResponseImageSize(retrieveResponse.data, 100);
        });

        it("should retrieve successful and thumbnail size is 64x64", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/instances/${instanceID}/thumbnail`, config.DICOMwebServer.baseUrl);
            retrieveStudyURL.searchParams.append("viewport", "64,64");
            console.log(`retrieve from: ${retrieveStudyURL}`);

            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'image/jpeg'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            await checkResponseImageSize(retrieveResponse.data, 64);
        });
    });
});

async function checkResponseImageSize(data, checkSize) {
    let filename = path.join(__dirname, `${uuid.v4()}.jpg`)
    await fsP.writeFile(filename, data);
    
    let size = await imageSize(filename);
    expect(size).have.property("type").equal("jpg");
    expect(size).have.property("height").equal(checkSize);
    expect(size).have.property("width").equal(checkSize);
    after(()=> {
        fsP.unlink(filename);
    });
}