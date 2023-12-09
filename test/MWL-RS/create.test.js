const { expect } = require("chai");
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
let { mwlTestData1 } = require("../../utils/mwl-collection.js");


describe("MWL-RS Create", () => {

    it("should store the mwlitem successfully", async () => {
        let createURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
        let createResponse = await axios.post(createURL.href, mwlTestData1, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(createResponse.status).to.equal(201);
    });

    it("should raise error because of `missing Patient ID (0010,0020)`", async () => {
        let clonedTestData = _.cloneDeep(mwlTestData1);
        delete clonedTestData[0]["00100020"];

        let createURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
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

    it("should raise error because of `missing Scheduled Procedure Step Sequence (0040,0100)`", async () => {
        let clonedTestData = _.cloneDeep(mwlTestData1);
        delete clonedTestData[0]["00400100"];

        let createURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
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