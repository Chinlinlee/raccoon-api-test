const { expect } = require("chai");
const path = require("path");
const { spawnSync } = require("child_process");
const iconv = require("iconv-lite");
const { config } = require("../../config/config");

describe("Test DIMSE C-STORE SCP", ()=> {

    it("Should using `dcmsend` send DICOM files successfully", () => {
        let cmd = [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
            "+sd",
            path.normalize(path.join(__dirname, "../../dicomFiles/2.000000-BRAINSCOUT-01639")),
            "+r",
            "+sp",
            "*.dcm"
        ];
        console.log(`do dcmsend: ${cmd.join(" ")}`)
        let { stdout, stderr } = spawnSync("dcmsend", cmd);

        let stderrStr = iconv.decode(stderr, "big5");
        expect(stderrStr).have.string("with status SUCCESS  : 5");
    });


    
});