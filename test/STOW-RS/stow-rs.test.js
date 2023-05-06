const { expect } = require("chai");
const fs = require('fs');
const path = require('path');
const { storeInstance } = require("../../utils/storeInstance");
const glob = require("glob");

describe("STOW-RS", () => {
    it("should store the j2k DICOM instance", async () => {
        let dicomFilename = path.join(__dirname, "../../dicomFiles/series-000001/image-000001.dcm");
        let response = await storeInstance(dicomFilename);
        expect(response.res.statusCode).to.equal(200);
    });
    it("should store the ISO 8859-1 (latin1) DICOM instance", async () => {
        let dicomFilename = path.join(__dirname, "../../dicomFiles/image-000001-latin1.dcm");
        let response = await storeInstance(dicomFilename);
        expect(response.res.statusCode).to.equal(200);
    });

    it("should store all DICOM files", async() => {
        let dicomFileDir = path.join(__dirname, "../../dicomFiles");
        let files = glob.sync("**/*.dcm", {
            cwd: dicomFileDir
        });
        for (let i = 0 ; i< files.length; i++) {
            let file = path.join(dicomFileDir, files[i]);
            console.log(`store DICOM ${i+1}/${files.length} to DICOMWeb server`);
            await storeInstance(file);
        }
    });
});