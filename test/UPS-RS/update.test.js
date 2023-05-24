const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
let { workItemTestData1, upsInstanceUID1, transactionUID1 } = require("../../utils/ups-collection");

describe("UPS-RS Update", () => {

    it("should update the workitem with worklist label `MODIFIED` successfully", async () => {
        let clonedTestWorkItem = _.cloneDeep(workItemTestData1);
        let updateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl);
        clonedTestWorkItem[0]["00741202"]["Value"] = ["MODIFIED"];
        let createResponse = await axios.post(updateURL.href, clonedTestWorkItem, {
            headers: { 'Accept': 'application/dicom+json' }
        });

        expect(createResponse.status).to.equal(200);

        let retrieveURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl)
        let retrieveResponse = await axios.get(retrieveURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        })
        expect(retrieveResponse.data[0]).have.property("00741202").have.property("Value").have.members(["MODIFIED"]);
    });

    it("should ignore updating the workitem with `PatientID`", async () => {
        let clonedTestWorkItem = _.cloneDeep(workItemTestData1);
        let updateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl);
        clonedTestWorkItem[0]["00100010"]["Value"] = ["foobarId"];
        let createResponse = await axios.post(updateURL.href, clonedTestWorkItem, {
            headers: { 'Accept': 'application/dicom+json' }
        });

        expect(createResponse.status).to.equal(200);

        let retrieveURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl)
        let retrieveResponse = await axios.get(retrieveURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });
        expect(retrieveResponse.data[0]).have.property("00100010").have.property("Value").deep.have.members([{"Alphabetic": "Last^First"}]);
    });
});
