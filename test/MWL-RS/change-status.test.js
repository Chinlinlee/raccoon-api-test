const { expect } = require("chai");
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const { mwlTestData1 } = require("../../utils/mwl-collection");

describe("MWL-RS Change mwlitem Status to READY", () => {
    it("should change mwlitem status to `READY`", async () => {

            let changeStatusUrl = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems/${mwlTestData1[0]["0020000D"].Value[0]}/${mwlTestData1[0]["00400100"].Value[0]["00400009"].Value[0]}/status/READY`, config.DICOMwebServer.baseUrl);

            let changeStatusResponse = await axios.post(changeStatusUrl.href, {
                headers: { 'Accept': 'application/dicom+json' }
            });

            expect(changeStatusResponse.status).to.equal(200);
            expect(changeStatusResponse.data).have.property("00400100").have.property("Value").have.property("0")
                                             .have.property("00400020").have.property("Value").have.members(["READY"]);
    });

    it("should change status of filtered mwlitems with PatientName to `STARTED`", async () => {
        let changeStatusUrl = new URL(`${config.DICOMwebServer.upsPrefix}/mwlitems/status/STARTED`, config.DICOMwebServer.baseUrl);
        changeStatusUrl.searchParams.append("PatientName", mwlTestData1[0]["00100010"].Value[0].Alphabetic);
        
        let changeStatusResponse = await axios.post(changeStatusUrl.href, {
            headers: { 'Accept': 'application/dicom+json' }
        });

        expect(changeStatusResponse.status).to.equal(200);
        expect(changeStatusResponse.data).have.property("updatedCount").equal(1);
    });
});