const { expect } = require("chai");
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');

const studyID = "1.3.6.1.4.1.14519.5.2.1.314316487728501506587013300243937537423";
const seriesID = "1.3.6.1.4.1.14519.5.2.1.221836838978562134707583793712566401639";
const instanceID = "1.3.6.1.4.1.14519.5.2.1.26977489569839622633788865854297140673";
describe("WADO-RS Retrieve Instance Resources", () => {
    it("should retrieve zip of all instances in Study", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve study: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'application/zip'},
            responseType: "arraybuffer"
        });
        expect(retrieveResponse.status).to.equal(200);
    });
    it("should retrieve zip of all instances in Series", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve series: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'application/zip'},
            responseType: "arraybuffer"
        });
        expect(retrieveResponse.status).to.equal(200);
    });
    it("should retrieve zip of instance", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/instances/${instanceID}`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve instance: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'application/zip'},
            responseType: "arraybuffer"
        });
        expect(retrieveResponse.status).to.equal(200);
    });
});