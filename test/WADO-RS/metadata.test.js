const { expect } = require("chai");
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');

const studyID = "1.3.6.1.4.1.14519.5.2.1.314316487728501506587013300243937537423";
const seriesID = "1.3.6.1.4.1.14519.5.2.1.221836838978562134707583793712566401639";
const instanceID = "1.3.6.1.4.1.14519.5.2.1.26977489569839622633788865854297140673";
describe("WADO-RS Retrieve Transaction Metadata Resources", () => {
    it("should retrieve all instances' metadata in Study", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/metadata`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS study's metadata: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'application/dicom+json'},
            responseType: "json"
        });
        expect(retrieveResponse.status).to.equal(200);
        expect(retrieveResponse.data, "The study's metadata amount must be 10").to.have.lengthOf(10);
    });

    it("should retrieve all instances' metadata in Series", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/metadata`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS retrieve series' metadata: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'application/dicom'},
            responseType: "json"
        });
        expect(retrieveResponse.status).to.equal(200);
        expect(retrieveResponse.data, "The series' metadata amount must be 5").to.have.lengthOf(5);
    });

    it("should retrieve instance's metadata", async() => {
        let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}/instances/${instanceID}/metadata`, config.DICOMwebServer.baseUrl);
        console.log(`do WADO-RS instance's metadata: ${retrieveStudyURL.href}`);
        let retrieveResponse = await axios.get(retrieveStudyURL.href, {
            headers: { 'Accept': 'application/dicom'},
            responseType: "json"
        });
        expect(retrieveResponse.status).to.equal(200);

        expect(retrieveResponse.data, "The instance's metadata amount must be 1").to.have.lengthOf(1);
    });
});