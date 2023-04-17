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

let wsiDICOM = studyCollection[2];
const studyID = "2.16.840.1.113995.3.110.3.0.10118.2000002.278819.649182";
const seriesID = "2.16.840.1.113995.3.110.3.0.10118.2000002.862753";
const instanceID = "2.16.840.1.113995.3.110.3.0.10118.2000002.862753.1";

describe("WADO-RS Retrieve Transaction Rendered Resources", () => {

    before(async ()=> {
        let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${
            wsiDICOM.studyID
        }/series/${
            wsiDICOM.seriesID
        }/instances`, config.DICOMwebServer.baseUrl);
        let searchResponse = await axios.get(searchURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });
        let dataLength = _.get(searchResponse, "data.length");
        if (dataLength >= 5) {
            return;
        }
        let dicomFileDir = path.join(__dirname, "../../dicomFiles");
        let files = glob.sync("multiframes-wsi/*.dcm", {
            cwd: dicomFileDir
        });
        for (let i = 0 ; i< files.length; i++) {
            let file = path.join(dicomFileDir, files[i]);
            console.log(`store DICOM ${i+1}/${files.length} to DICOMWeb server`);
            await storeInstance(file);
        }
    });

    describe("Retrieve Rendered Study", () => {
        it("should retrieve successful and return 17 rendered instances in multipart", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/rendered`, config.DICOMwebServer.baseUrl);
            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'multipart/related; type="image/jpeg"'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            let multipartData = multipartDecode(retrieveResponse.data);
            expect(multipartData.length, "The instances amount must be 17").to.equal(17);
        });
    });

    describe("Retrieve Rendered Series", ()=> {
        it("should retrieve successful and return 17 rendered instances in multipart", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/rendered`, config.DICOMwebServer.baseUrl);
            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'multipart/related; type="image/jpeg"'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            let multipartData = multipartDecode(retrieveResponse.data);
            expect(multipartData.length, "The instances amount must be 17").to.equal(17);
        });
    });

    describe("Retrieve Rendered Instance", ()=> {
        it("should retrieve successful and return 1 rendered instance in multipart", async ()=> {
            let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/instances/${instanceID}/rendered`, config.DICOMwebServer.baseUrl);
            console.log(`retrieve from: ${retrieveStudyURL}`);

            let retrieveResponse = await axios.get(retrieveStudyURL.href, {
                headers: { 'Accept': 'multipart/related; type="image/jpeg"'},
                responseType: "arraybuffer",
                timeout: 300000
            });
            expect(retrieveResponse.status).to.equal(200);
            let multipartData = multipartDecode(retrieveResponse.data);
            expect(multipartData.length, "The instances amount must be 1").to.equal(1);
        });
    });
});