const { expect } = require("chai");
const path = require("path");
const { spawnSync } = require("child_process");
const iconv = require("iconv-lite");
const { config } = require("../../config/config");
const { studyCollection } = require("../../utils/study-collection");

class FindScuCmdBuilder {
    constructor() {
        /** 
         * @type {string[]}
         * @private
         */
        this.cmd = [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
        ]
    }

    addKeyAndValue(key, value) {
        this.cmd.push("-k");
        this.cmd.push(`${key}=${value}`);
        return this;
    }
    
    setToPatientLevel() {
        this.cmd.push("-P");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=PATIENT");
        return this;
    }

    setToStudyLevel() {
        this.cmd.push("-S");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=STUDY");
        return this;
    }

    setToSeriesLevel() {
        this.cmd.push("-S");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=SERIES");
        return this;
    }

    setToInstanceLevel() {
        this.cmd.push("-S");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=IMAGE");
        return this;
    }

    getCmd() {
        return this.cmd;
    }
}

class DimsePatientTester {
    constructor() { }

    /**
     * Test the (tag) 00100010 of search parameters
     */
    testPatientName() {
        it("should search 00100010 and return 1 patient", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                            .setToPatientLevel()
                            .addKeyAndValue("0010,0010", studyCollection[0].PatientName);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }

    testPatientID() {
        it("should search 00100020 and return 1 patient", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToPatientLevel()
                             .addKeyAndValue("0010,0020", studyCollection[0].PatientID);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }

    testMultiplePatientName() {
        it("should search multiple 00100010 and return 2 patients", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToPatientLevel()
                             .addKeyAndValue("0010,0010", `${studyCollection[0].PatientName}\\${studyCollection[1].PatientName}`)

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 2 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 3 (Pending)");
        });
    }

    testSplatPatientName() {
        it("should search value contains splat successful and return 1 study", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToPatientLevel()
                             .addKeyAndValue("0010,0010", `${studyCollection[0].PatientName.substring(0, 2)}*`);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }
}

class DimseStudyTester {
    constructor() { }

    testAccessionNumber() {
        it("should search 00080050 and return 1 study", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0050", studyCollection[2].AccessionNumber);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }

    testStudyDate() {
        it("should search StudyDate exact (eq, 20090721) successful, return 1 study", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0020", studyCollection[0].StudyDate);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");

        });

        it("should search StudyDate between (20060101-20201231) successful, return 5 studies", async function () {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0020", "20060101-20201231");

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 5 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 6 (Pending)");

        });

        it("should search StudyDate start from (20090101-) successful, return 4 studies", async function () {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0020", "20090101-");

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");

            expect(stderrStr).have.string("Find Response: 4 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 5 (Pending)");

        });

        it("should search StudyDate end to (-20091231) successful, return 2 studies", async function () {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0020", "-20091231");

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 2 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 3 (Pending)");

        });

    }

    testStudyTime() {
        it("should search StudyDate exact (eq, 110509.997000) successful, return 1 study", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0030", studyCollection[0].StudyTime);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");

        });

        it("should search StudyDate between (0900-1100) successful, return 4 studies", async function () {

            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0030", "0900-1100");

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 4 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 5 (Pending)");

        });

        it("should search StudyDate start from (1000-) successful, return 3 studies", async function () {

            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0030", "1000-");

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");

            expect(stderrStr).have.string("Find Response: 3 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 4 (Pending)");

        });

        it("should search StudyDate end to (-1000) successful, return 2 studies", async function () {
            
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToStudyLevel()
                             .addKeyAndValue("0008,0030", "-1000");

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 2 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 3 (Pending)");

        });
    }
}

class DimseSeriesTester {
    constructor() { }

    testModality() {
        it("should search Modality (00080060) successful and return 2 series", async () => {

            let cmdBuilder = new FindScuCmdBuilder()
                             .setToSeriesLevel()
                             .addKeyAndValue("0020,000D", studyCollection[0].studyID)
                             .addKeyAndValue("0008,0060", studyCollection[0].Modality);


            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 2 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 3 (Pending)");

        });
    }

    testSeriesNumber() {
        it("should search SeriesNumber (tag, 00200011) successful and return 1 series", async () => {

            let cmdBuilder = new FindScuCmdBuilder()
                             .setToSeriesLevel()
                             .addKeyAndValue("0020,000D", studyCollection[1].studyID)
                             .addKeyAndValue("0020,0011", studyCollection[1].SeriesNumber);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }
}

class DimseInstanceTester {
    constructor() { }

    testSOPClassUID() {
        it("should search SOPClassUID (keyword) successful and return 10 instances", async() => {
            let cmdBuilder = new FindScuCmdBuilder()
                             .setToInstanceLevel()
                             .addKeyAndValue("0020,000D", studyCollection[0].studyID)
                             .addKeyAndValue("0020,000E", studyCollection[0].seriesID)
                             .addKeyAndValue("0008,0052", studyCollection[0].SOPClassUID);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 10 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 11 (Pending)");
        });
    }

    testInstanceNumber() {
        it("should search InstanceNumber (keyword) successful and return 1 instance", async () => {

            let cmdBuilder = new FindScuCmdBuilder()
                             .setToInstanceLevel()
                             .addKeyAndValue("0020,000D", studyCollection[0].studyID)
                             .addKeyAndValue("0020,000E", studyCollection[0].seriesID)
                             .addKeyAndValue("0020,0013", studyCollection[0].InstanceNumber);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }

    testMultipleInstanceUID() {
        it("should search multiple SOPInstanceUID successful and return 2 instances", async () => {

            let cmdBuilder = new FindScuCmdBuilder()
                             .setToInstanceLevel()
                             .addKeyAndValue("0020,000D", studyCollection[0].studyID)
                             .addKeyAndValue("0020,000E", studyCollection[0].seriesID)
                             .addKeyAndValue("0008,0018", `1.3.6.1.4.1.14519.5.2.1.275395880383012565302057498557552914515\\1.3.6.1.4.1.14519.5.2.1.68299632452800327919878144388549392817`);

            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

            let stderrStr = iconv.decode(stderr, "big5");
            expect(stderrStr).have.string("Find Response: 2 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 3 (Pending)");
        });
    }
}

describe("Test DIMSE C-FIND SCP", () => {

    it("Should find 4 patients", () => {

        let cmd =  [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
            "-P",
            "-k",
            "0008,0052=PATIENT",
            "-k",
            "0010,0010="
        ];
        let cmdBuilder = new FindScuCmdBuilder()
                         .setToPatientLevel()
                         .addKeyAndValue("0010,0010", "");

        console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

        let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());

        let stderrStr = iconv.decode(stderr, "big5");
        expect(stderrStr).have.string("Find Response: 4 (Pending)");
        expect(stderrStr).not.have.string("Find Response: 5 (Pending)");
    });

    let patientTester = new DimsePatientTester();

    patientTester.testPatientName();
    patientTester.testPatientID();
    patientTester.testMultiplePatientName();

    let studyTester = new DimseStudyTester();
    studyTester.testAccessionNumber();
    studyTester.testStudyDate();
    studyTester.testStudyDate();

    let seriesTester = new DimseSeriesTester();
    seriesTester.testModality();

    let instanceTester = new DimseInstanceTester();
    instanceTester.testInstanceNumber();

});