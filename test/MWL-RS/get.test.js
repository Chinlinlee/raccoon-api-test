const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
const { mwlTestData1 } = require("../../utils/mwl-collection");

describe("MWL-RS GET", () => {

    it("should query the MWL items with `PatientName` and return 1 item", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
        queryURL.searchParams.append("PatientName", "Philips^Amy");
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(200);
        expect(response.data).have.property("length").equal(1);
    });
    it("should query the MWL items with `PatientName` and return 204", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
        queryURL.searchParams.append("PatientName", "123456789foobar");
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(204);
    });

    it("should query the MWL items with `Scheduled Procedure Step ID` and return 1 item", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
        queryURL.searchParams.append("00400100.00400009", "SPS-00000002");
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(200);
        expect(response.data).have.property("length").equal(1);
    });
    it("should query the MWL items with `Scheduled Procedure Step ID` and return 204", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems`, config.DICOMwebServer.baseUrl);
        queryURL.searchParams.append("00400100.00400009", "foobarID");
        let response = await axios.get(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(204);
    });


});