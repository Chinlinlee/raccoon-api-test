const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
let { workItemTestData1 } = require("../../utils/ups-collection");
describe("UPS-RS GET", () => {

    it("should query the workitem with `PatientName` and return 1 item", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems`, config.DICOMwebServer.baseUrl);
        queryURL.searchParams.append("PatientName", "Last^First");
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(200);
        expect(response.data).have.property("length").equal(1);
    });

    it("should query the workitem and return 204", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems`, config.DICOMwebServer.baseUrl);
        queryURL.searchParams.append("PatientName", "123456789foobar");
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(204);
    });

    it("should retrieve the workitem with `InstanceUID` and return 1 item", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/2.25.304735844106676112282377091360345596551`, config.DICOMwebServer.baseUrl);
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(200);
        expect(response.data).have.property("length").equal(1);
    });

    it("should retrieve the not exist workitem with `InstanceUID` and return 404", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/2.25.3047358441066761122823770913603455965512345678`, config.DICOMwebServer.baseUrl);
        let status;
        try {
            await axios.get(queryURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
        } catch(e) {
            status = e.response.status;
        }
        

        expect(status).to.equal(404);
    });


});