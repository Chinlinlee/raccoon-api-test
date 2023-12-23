const { expect } = require("chai");
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
let { patients } = require("../../utils/patient-collection.js");
let patientTestData = patients[0];

describe("PAM-RS Create", () => {

    it("should store the patient successfully", async () => {
        let createURL = new URL(`${config.DICOMwebServer.stowPrefix}/patients`, config.DICOMwebServer.baseUrl);
        let createResponse = await axios.post(createURL.href, patientTestData, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(createResponse.status).to.equal(201);
    });

    it("should raise error because of `missing Patient ID (0010,0020)`", async () => {
        let clonedTestData = _.cloneDeep(patientTestData);
        delete clonedTestData["00100020"];

        let createURL = new URL(`${config.DICOMwebServer.stowPrefix}/patients`, config.DICOMwebServer.baseUrl);
        let status;
        let data;
        try {
            await axios.post(createURL.href, clonedTestData, {
                headers: { 'Accept': 'application/dicom+json'}
            });
        } catch(e) {
            status = e.response.status;
            data = e.response.data;
        }

        expect(status).to.equal(400);
    });
});