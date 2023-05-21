const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
let { workItemTestData1 } = require("../../utils/ups-collection");


describe("UPS-RS Create", () => {

    it("should store the workitem successfully", async () => {
        let createURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems`, config.DICOMwebServer.baseUrl);
        createURL.searchParams.append("workitem", "2.25.304735844106676112282377091360345596551");
        let createResponse = await axios.post(createURL.href, workItemTestData1, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(createResponse.status).to.equal(201);
    });

    it("should raise error because of `UPSNotSchedule`", async () => {
        let clonedTestData = _.cloneDeep(workItemTestData1);
        clonedTestData[0]["00741000"]["Value"] = ["COMPLETED"];

        let createURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems`, config.DICOMwebServer.baseUrl);
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
        expect(data).to.have.property("status").equal("C309");
    });

    it("should raise error because `Duplicate UPS Instance UID`", async () => {
        let createURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems`, config.DICOMwebServer.baseUrl);
        createURL.searchParams.append("workitem", "2.25.304735844106676112282377091360345596551");
        let status;
        let data;
        try {
            await axios.post(createURL.href, workItemTestData1, {
                headers: { 'Accept': 'application/dicom+json'}
            });
        } catch(e) {
            status = e.response.status;
            data = e.response.data;
        }
        
        expect(status).to.equal(400);
        expect(data).to.have.property("status").equal("0111");
    });

});