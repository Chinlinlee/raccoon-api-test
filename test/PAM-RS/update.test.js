const { expect } = require("chai");
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
let { patients } = require("../../utils/patient-collection.js");
let patientTestData = patients[0];

describe("PAM-RS Update", () => {

    it("should update the patient successfully", async () => {
        let updateURL = new URL(`${config.DICOMwebServer.stowPrefix}/patients/${patientTestData["00100020"]["Value"][0]}`, config.DICOMwebServer.baseUrl);
        let clonedTestData = _.cloneDeep(patientTestData);
        clonedTestData["00100020"]["Value"] = ["foobarId"];
        clonedTestData["00104000"]["Value"] = ["This is updated comment"];
        let updateResponse = await axios.put(updateURL.href, clonedTestData, {
            headers: { 'Accept': 'application/dicom+json'}
        });

        expect(updateResponse.status).to.equal(200);
        // expect data not change patient ID in dicom json
        expect(updateResponse.data).have.property("00100020").have.property("Value").have.members(patientTestData["00100020"].Value);
        expect(updateResponse.data).have.property("00104000").have.property("Value").have.members(clonedTestData["00104000"].Value);
    });
});