const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
let { workItemTestData1, upsInstanceUID1, transactionUID1 } = require("../../utils/ups-collection");
const { WebSocket } = require("ws");

describe("UPS-RS Subscription", () => {

    it("should subscribe global subscription and receive 1 initial event from ws", async () => {
        return new Promise(async resolve => {
            let subscribeURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/1.2.840.10008.5.1.4.34.5/subscribers/${config.DICOMwebServer.upsAeTitle}`, config.DICOMwebServer.baseUrl);
            let ws = new WebSocket(`ws://${subscribeURL.host}/ws/subscribers/${config.DICOMwebServer.upsAeTitle}`);
            ws.on("message", function (data) {
                let receivedData = JSON.parse(data);
                expect(receivedData).to.have.property("00001002").have.property("Value").is.an("array");
                ws.close();
                return resolve();
            });

            let subscribeResponse = await axios.post(subscribeURL.href, undefined, {
                headers: { 'Accept': 'application/dicom+json' }
            });

            expect(subscribeResponse.status).to.equal(201);
        });
    });

    it("should update progress information sequence and receive progress info update event", async () => {
        return new Promise(async resolve => {
            let subscribeURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/1.2.840.10008.5.1.4.34.5/subscribers/${config.DICOMwebServer.upsAeTitle}`, config.DICOMwebServer.baseUrl);
            let ws = new WebSocket(`ws://${subscribeURL.host}/ws/subscribers/${config.DICOMwebServer.upsAeTitle}`);
            ws.on("message", function (data) {
                let receivedData = JSON.parse(data);
                console.log(JSON.stringify(receivedData));
                expect(receivedData).to.have.property("00741002").have.property("Value").is.an("array");
                ws.close();
                return resolve();
            }); 

            let workItemTestData1Cloned = _.cloneDeep(workItemTestData1);
            workItemTestData1Cloned[0]["00741002"] = {
                "vr": "SQ",
                "Value": [
                    {
                        "00741004": {
                            "vr": "DS",
                            "Value": [
                                "20"
                            ]
                        }
                    }
                ]
            }

            let updateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl);
            let updateResponse = await axios.post(updateURL.href, workItemTestData1Cloned, {
                headers: { 'Accept': 'application/dicom+json' }
            });

            expect(updateResponse.status).to.equal(200);
        });

    });

});