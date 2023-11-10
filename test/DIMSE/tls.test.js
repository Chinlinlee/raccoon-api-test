const path = require("path");
const { spawnSync } = require("child_process");
const { config } = require("../../config/config");
const iconv = require("iconv-lite");
const { expect } = require("chai");

class DimseTlsTester {
    testUsingStoreScp() {
        it("should using `storescu` store DICOM files through TLS", async () => {

            let cmd = [
                "-c",
                `${config.DIMSE.aec}@${config.DIMSE.ip}:${config.DIMSE.port}`,
                `${path.join(__dirname, "../../dicomFiles/series-000001")}`,
                "--tls",
                "--key-pass",
                "secret",
                "--key-store",
                `${path.join(__dirname, "../..", config.DIMSE.tls.key)}`,
                "--key-store-pass",
                "secret"
            ];

            console.log(`storescu ${cmd.join(" ")}`);

            let { stdout, stderr } = spawnSync(config.DIMSE.tls["dcm4che-storescp-bin-path"], cmd);

            let stdoutStr = iconv.decode(stdout, "big5");
            expect(stdoutStr).have.string("Sent 1 objects");
        });
    }
}

if (config.DIMSE.tls.enabled) {
    describe("Test DIMSE TLS", async () => {
        let dimseTlsTester = new DimseTlsTester();
        await dimseTlsTester.testUsingStoreScp();
    });
}
