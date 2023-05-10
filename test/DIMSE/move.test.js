const { expect } = require("chai");
const { spawnSync } = require("child_process");
const iconv = require("iconv-lite");

const { config } = require("../../config/config");
const { studyCollection } = require("../../utils/study-collection");


describe("Test DIMSE C-MOVE SCP", () => {

    it("Should find 10 instances in Patient `GLIOMA01-i_03A6`", () => {
        let cmd =  [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-aem",
            config.DIMSE.move.aem,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
            "-k",
            "0008,0052=PATIENT",
            "-k",
            `0010,0020=${studyCollection[0].PatientID}`,
            "-od",
            config.DIMSE.move.outputDir,
            "--port",
            config.DIMSE.move.port,
            "+xa"
        ];

        console.log(`do movescu: ${cmd.join(" ")}`);

        let { stdout, stderr } = spawnSync("movescu", cmd);

        let stderrStr = iconv.decode(stderr, "big5");
        expect(stderrStr).have.string("I: Received Store Request (MsgID 10, MR)");
        expect(stderrStr).have.string("I: Received Final Move Response (Success)");
        expect(stderrStr).not.have.string("I: Received Store Request (MsgID 11, MR)");
    });

    it("Should find 10 instances in Patient `GLIOMA01-i_03A6` with Study level", () => {
        let cmd =  [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-aem",
            config.DIMSE.move.aem,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
            "-k",
            "0008,0052=STUDY",
            "-k",
            `0010,0020=${studyCollection[0].PatientID}`,
            "-k",
            `0020,000d=${studyCollection[0].studyID}`,
            "-od",
            config.DIMSE.move.outputDir,
            "--port",
            config.DIMSE.move.port,
            "+xa"
        ];

        console.log(`do movescu: ${cmd.join(" ")}`);

        let { stdout, stderr } = spawnSync("movescu", cmd);

        let stderrStr = iconv.decode(stderr, "big5");
        expect(stderrStr).have.string("I: Received Store Request (MsgID 10, MR)");
        expect(stderrStr).have.string("I: Received Final Move Response (Success)");
        expect(stderrStr).not.have.string("I: Received Store Request (MsgID 11, MR)");
    });

    it("Should find 5 instances in Patient `GLIOMA01-i_03A6` with Series level", () => {
        let cmd =  [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-aem",
            config.DIMSE.move.aem,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
            "-k",
            "0008,0052=SERIES",
            "-k",
            `0010,0020=${studyCollection[0].PatientID}`,
            "-k",
            `0020,000d=${studyCollection[0].studyID}`,
            "-k",
            `0020,000e=${studyCollection[0].seriesID}`,
            "-od",
            config.DIMSE.move.outputDir,
            "--port",
            config.DIMSE.move.port,
            "+xa"
        ];

        console.log(`do movescu: ${cmd.join(" ")}`);

        let { stdout, stderr } = spawnSync("movescu", cmd);

        let stderrStr = iconv.decode(stderr, "big5");
        expect(stderrStr).have.string("I: Received Store Request (MsgID 5, MR)");
        expect(stderrStr).have.string("I: Received Final Move Response (Success)");
        expect(stderrStr).not.have.string("I: Received Store Request (MsgID 6, MR)");
    });

    it("Should find 1 instance in Patient `GLIOMA01-i_03A6` with Instance level", () => {
        let cmd =  [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-aem",
            config.DIMSE.move.aem,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
            "-k",
            "0008,0052=IMAGE",
            "-k",
            `0010,0020=${studyCollection[0].PatientID}`,
            "-k",
            `0020,000d=${studyCollection[0].studyID}`,
            "-k",
            `0020,000e=${studyCollection[0].seriesID}`,
            "-k",
            `0008,0018=${studyCollection[0].instanceID}`,
            "-od",
            config.DIMSE.move.outputDir,
            "--port",
            config.DIMSE.move.port,
            "+xa"
        ];

        console.log(`do movescu: ${cmd.join(" ")}`);

        let { stdout, stderr } = spawnSync("movescu", cmd);

        let stderrStr = iconv.decode(stderr, "big5");
        expect(stderrStr).have.string("I: Received Store Request (MsgID 1, MR)");
        expect(stderrStr).have.string("I: Received Final Move Response (Success)");
        expect(stderrStr).not.have.string("I: Received Store Request (MsgID 2, MR)");
    });
});