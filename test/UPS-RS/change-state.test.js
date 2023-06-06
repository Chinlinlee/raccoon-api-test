const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const { config } = require("../../config/config");
const _ = require("lodash");
const { WebSocket } = require("ws");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
let { workItemTestData1, upsInstanceUID1, transactionUID1 } = require("../../utils/ups-collection");

describe("UPS-RS Change Workitem State to IN PROGRESS", () => {
    it("should change workitem state to `IN PROGRESS` and receive change state event in ws", async () => {
        return new Promise(async resolve => {

            let subscribeURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/1.2.840.10008.5.1.4.34.5/subscribers/${config.DICOMwebServer.upsAeTitle}`, config.DICOMwebServer.baseUrl);
            let ws = new WebSocket(`ws://${subscribeURL.host}/ws/subscribers/${config.DICOMwebServer.upsAeTitle}`);
            ws.on("message", function (data) {
                let receivedData = JSON.parse(data);
                expect(receivedData).to.have.property("00741000").have.property("Value").is.an("array").and.has.members(["IN PROGRESS"]);
                expect(receivedData).to.have.property("00404041").have.property("Value").is.an("array");
                ws.close();
                return resolve();
            });

            const inProgressBody = [
                {
                    "00741000": {
                        "vr": "CS",
                        "Value": [
                            "IN PROGRESS"
                        ]
                    },
                    "00081195": {
                        "vr": "UI",
                        "Value": [
                            `${transactionUID1}`
                        ]
                    }
                }
            ];

            let changeStateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}/state`, config.DICOMwebServer.baseUrl);
            let changeStateResponse = await axios.put(changeStateURL.href, inProgressBody, {
                headers: { 'Accept': 'application/dicom+json' }
            });

            expect(changeStateResponse.status).to.equal(200);

            let retrieveURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl)
            let retrieveResponse = await axios.get(retrieveURL.href, {
                headers: { 'Accept': 'application/dicom+json' }
            });
            expect(retrieveResponse.data[0]).have.property("00741000").have.property("Value").have.members(["IN PROGRESS"]);
            expect(retrieveResponse.data[0]).not.have.property("00081195");
        });

    });
});

describe("UPS-RS Change Workitem State to COMPLETED", () => {
    it("should raise error `Failed: The UPS has not met final state requirements for the requested state change`", async () => {

        const inProgressBody = [
            {
                "00741000": {
                    "vr": "CS",
                    "Value": [
                        "COMPLETED"
                    ]
                },
                "00081195": {
                    "vr": "UI",
                    "Value": [
                        `${transactionUID1}`
                    ]
                }
            }
        ];

        let changeStateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}/state`, config.DICOMwebServer.baseUrl);

        let status;
        try {
            await axios.put(changeStateURL.href, inProgressBody, {
                headers: { 'Accept': 'application/dicom+json' }
            });
        } catch (e) {
            status = e.response.status;
        }

        expect(status).to.equal(409);
    });

    it("should update workitem with performed info", async () => {
        let upsPerformedProcedureSequence = [
            {
                "00741216": {
                    "vr": "SQ",
                    "Value": [
                        {
                            "0040E020": {
                                "vr": "CS",
                                "Value": [
                                    "DICOM"
                                ]
                            },
                            "00404050": {
                                "vr": "DT",
                                "Value": [
                                    dayjs().format("YYYYMMDDhhmmss.SSSSSSZZ")
                                ]
                            },
                            "00404051": {
                                "vr": "DT",
                                "Value": [
                                    dayjs().format("YYYYMMDDhhmmss.SSSSSSZZ")
                                ]
                            },
                            "00404028": {
                                "vr": "SQ",
                                "Value": [
                                    {
                                        "00080100": {
                                            "vr": "SH",
                                            "Value": ["AnyStation"]
                                        },
                                        "00080102": {
                                            "vr": "SH",
                                            "Value": ["RadReadingGroup"]
                                        },
                                        "00080104": {
                                            "vr": "LO",
                                            "Value": ["performerAE"]
                                        }
                                    }
                                ]
                            },
                            "00404019": {
                                "vr": "SQ",
                                "Value": [
                                    {
                                        "00080100": {
                                            "vr": "SH",
                                            "Value": ["AnyMethod"]
                                        },
                                        "00080102": {
                                            "vr": "SH",
                                            "Value": ["99RACCOON"]
                                        },
                                        "00080104": {
                                            "vr": "LO",
                                            "Value": ["Local Any Method"]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                "00081195": {
                    "vr": "UI",
                    "Value": [
                        `${transactionUID1}`
                    ]
                }
            }
        ]

        let clonedTestWorkItem = _.cloneDeep(workItemTestData1);
        _.merge(clonedTestWorkItem[0], upsPerformedProcedureSequence[0]);

        let updateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl);
        let updateResponse = await axios.post(updateURL.href, clonedTestWorkItem, {
            headers: { 'Accept': 'application/dicom+json' }
        });

        expect(updateResponse.status).to.equal(200);

        let retrieveURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}`, config.DICOMwebServer.baseUrl)
        let retrieveResponse = await axios.get(retrieveURL.href, {
            headers: { 'Accept': 'application/dicom+json' }
        });
        // have Station Name Code Sequence
        expect(retrieveResponse.data[0]).have.property("00741216").have.property("Value").to.have.deep.nested.property("[0].00404028");
        // have Workitem Code Sequence
        expect(retrieveResponse.data[0]).have.property("00741216").have.property("Value").to.have.deep.nested.property("[0].00404019");
    });

    it("should change workitem state to COMPLETED", async () => {

        const inProgressBody = [
            {
                "00741000": {
                    "vr": "CS",
                    "Value": [
                        "COMPLETED"
                    ]
                },
                "00081195": {
                    "vr": "UI",
                    "Value": [
                        `${transactionUID1}`
                    ]
                }
            }
        ];

        let changeStateURL = new URL(`${config.DICOMwebServer.upsPrefix}/workitems/${upsInstanceUID1}/state`, config.DICOMwebServer.baseUrl);

        let changeStateRes = await axios.put(changeStateURL.href, inProgressBody, {
            headers: { 'Accept': 'application/dicom+json' }
        });

        expect(changeStateRes.status).to.equal(200);
    });
});