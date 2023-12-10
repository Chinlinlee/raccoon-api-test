const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
const { mwlTestData1 } = require("../../utils/mwl-collection");

describe("MWL-RS DELETE", () => {

    it("should delete the MWL item", async () => {
        let studyUID = mwlTestData1[0]["0020000D"]["Value"][0];
        let spsID = mwlTestData1[0]["00400100"]["Value"][0]["00400009"]["Value"][0];
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems/${studyUID}/${spsID}`, config.DICOMwebServer.baseUrl);
        let response = await axios.delete(queryURL.href, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(response.status).to.equal(200);
    });

    it("should raise 404 when delete the non-existing MWL", async () => {
        let queryURL = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems/fooStudy/barSps`, config.DICOMwebServer.baseUrl);
        let data, status;
        try {
            let response = await axios.delete(queryURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
        } catch(e) {
            status = e.response.status;
            data = e.response.data;
        }

        expect(status).to.equal(404);
    });

});