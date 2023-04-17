const path = require("path");
const { expect } = require("chai");
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const { multipartDecode } = require("../../utils/message");
const { storeInstance } = require("../../utils/storeInstance");
const glob = require("glob");
const fs = require("fs");
const uuid = require("uuid");

before(async ()=> {
    let dicomFileDir = path.join(__dirname, "../../dicomFiles");
    let files = glob.sync("*BRAIN*/*.dcm", {
        cwd: dicomFileDir
    });
    for (let i = 0 ; i< files.length; i++) {
        let file = path.join(dicomFileDir, files[i]);
        console.log(`store DICOM ${i+1}/${files.length} to DICOMWeb server`);
        await storeInstance(file);
    }
});
const studyID = "1.3.6.1.4.1.14519.5.2.1.314316487728501506587013300243937537423";
const seriesID = "1.3.6.1.4.1.14519.5.2.1.221836838978562134707583793712566401639";
const instanceID = "1.3.6.1.4.1.14519.5.2.1.26977489569839622633788865854297140673";
describe("WADO-RS Retrieve Instance Resources", () => {
    it("should retrieve all instances in Study", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve study: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'multipart/related; type="application/dicom"'},
            responseType: "arraybuffer"
        });
        expect(retrieveResponse.status).to.equal(200);

        let multipartData = multipartDecode(retrieveResponse.data);
        expect(multipartData.length, "The instances amount must be 10").to.equal(10);
    });
    it("should retrieve all instances in Series", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve series: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'multipart/related; type="application/dicom"'},
            responseType: "arraybuffer"
        });
        expect(retrieveResponse.status).to.equal(200);
        let multipartData = multipartDecode(retrieveResponse.data);
        expect(multipartData.length, "The instances amount must be 5").to.equal(5);
    });
    it("should retrieve instance", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/instances/${instanceID}`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve instance: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'multipart/related; type="application/dicom"'},
            responseType: "arraybuffer"
        });
        expect(retrieveResponse.status).to.equal(200);

        let multipartData = multipartDecode(retrieveResponse.data);
        expect(multipartData.length, "The instances amount must be 1").to.equal(1);
    });
});