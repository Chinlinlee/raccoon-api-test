const path = require("path");
const { spawnSync } = require("child_process");
const { config } = require("../../config/config");
const iconv = require("iconv-lite");
const { expect } = require("chai");

class DimseTlsTester {
    testUsingStoreScp() {
        it("should using `storescu` store DICOM files through TLS", async () => {

            let cmd =  [
                "-aet",
                "ANYSCU",
                "-aec",
                config.DIMSE.aec,
                "-v",
                config.DIMSE.ip,
                config.DIMSE.port,
                "+tls",
                config.DIMSE.tls.key,
                config.DIMSE.tls["certificate-key"],
                "+cf",
                config.DIMSE.tls.certificate,
                "+cs",
                "TLS_RSA_WITH_AES_128_CBC_SHA"
            ];

            console.log(`echoscu-tls ${cmd.join(" ")}`);

            let { stdout, stderr } = spawnSync("echoscu-tls", cmd);

            let stderrStr = iconv.decode(stderr, "big5");
            console.log(stderrStr);
            expect(stderrStr).have.string("I: Received Echo Response (Success)");
        });
    }
}

if (config.DIMSE.tls.enabled) {
    describe("Test DIMSE TLS", async () => {
        let dimseTlsTester = new DimseTlsTester();
        await dimseTlsTester.testUsingStoreScp();
    });
}
