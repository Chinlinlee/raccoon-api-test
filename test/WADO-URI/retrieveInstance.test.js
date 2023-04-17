const _ = require("lodash");
const { expect } = require("chai");
const path = require("path");
const { storeInstance } = require("../../utils/storeInstance");
const axios = require('axios').default;
const { URL, URLSearchParams } = require('url');
const { config } = require('../../config/config');
const { studyCollection } = require("../../utils/study-collection");
const { multipartDecode } = require("../../utils/message");
const request = require("supertest")(config.DICOMwebServer.baseUrl);


const studyID = studyCollection[0].studyID;
const seriesID = studyCollection[0].seriesID;
const instanceID = studyCollection[0].instanceID;

const jpeg2000StudyUID = studyCollection[4].studyID;
const jpeg2000SeriesUID = studyCollection[4].seriesID;
const jpeg2000InstanceUID = studyCollection[4].instanceID;

async function isJpeg2000Exist() {
    let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${
        jpeg2000StudyUID
    }/series/${
        jpeg2000SeriesUID
    }/instances`, config.DICOMwebServer.baseUrl);
    let searchResponse = await axios.get(searchURL.href, {
        headers: { 'Accept': 'application/dicom+json'}
    });
    let dataLength = _.get(searchResponse, "data.length");
    return dataLength > 0;
}

describe("WADO-RS Retrieve Instance Resources", () => {

    before(async ()=> {
        if (!await isJpeg2000Exist()) {
            let dicomFilename = path.join(__dirname, "../../dicomFiles/jpeg2000/example-jpeg-2000.dcm");
            console.log("upload jpeg2000 DICOM file");
            await storeInstance(dicomFilename);
        }
    });

    it("should retrieve instance with DICOM format", async() => {
        
        let params = new URLSearchParams();
        params.append("requestType", "WADO");
        params.append("studyUID", studyID);
        params.append("seriesUID", seriesID);
        params.append("objectUID", instanceID);
        params.append("contentType", "application/dicom");

        let retrieveUrl = `/${config.DICOMwebServer.wadoUriPrefix}?${params.toString()}`;

        console.log(`retrieve single DICOM instance from ${retrieveUrl}`);

        const response = await request.get(retrieveUrl)
                                      .set("Accept", "application/dicom");
        
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("application/dicom");
        
    });

    it("should retrieve instance with JPEG format", async() => {

        let params = getJpegParamsObject(studyID, seriesID, instanceID);

        let retrieveUrl = `/${config.DICOMwebServer.wadoUriPrefix}?${params.toString()}`;

        console.log(`retrieve single DICOM instance from ${retrieveUrl}`);

        const response = await request.get(retrieveUrl)
                                      .set("Accept", "image/jpeg");
        
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/jpeg");
        
    });

    it("should return 204", async() => {

        let params = new URLSearchParams();
        params.append("requestType", "WADO");
        params.append("studyUID", "foo");
        params.append("seriesUID", "bar");
        params.append("objectUID", "buzz");
        params.append("contentType", "application/dicom");

        let retrieveUrl = `/${config.DICOMwebServer.wadoUriPrefix}?${params.toString()}`;

        console.log(`retrieve single DICOM instance from ${retrieveUrl}`);

        const response = await request.get(retrieveUrl)
                                      .set("Accept", "application/dicom");
        
        expect(response.statusCode).to.equal(204);
        expect(response.headers["content-type"]).to.equal("application/dicom+json");
        
    });

    it("should retrieve jpeg instance with frame number 1", async () => {
        let response = await getResponseOfRetrieveJpegInstanceWithFrameNumber();
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/jpeg");
    });

    it("should cause error when retrieve jpeg instance with invalid frame number", async () => {
        let response = await getResponseOfRetrieveJpegInstanceWithFrameNumber("999");
        expect(response.statusCode).to.equal(400);
    });

    it("should retrieve jpeg 2000", async () => {
        let params = getJpegParamsObject(jpeg2000StudyUID, jpeg2000SeriesUID, jpeg2000InstanceUID);

        let retrieveUrl = `/${config.DICOMwebServer.wadoUriPrefix}?${params.toString()}`;

        console.log(`retrieve single DICOM instance from ${retrieveUrl}`);

        const response = await request.get(retrieveUrl)
                                      .set("Accept", "image/jpeg");
        
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/jpeg");
    });

});

async function getResponseOfRetrieveJpegInstanceWithFrameNumber(frameNumber="1") {
    let params = getJpegParamsObject(studyID, seriesID, instanceID);
    params.append("frameNumber", frameNumber);

    let retrieveUrl = `/${config.DICOMwebServer.wadoUriPrefix}?${params.toString()}`;

    console.log(`retrieve single DICOM instance from ${retrieveUrl}`);

    const response = await request.get(retrieveUrl)
                                      .set("Accept", "application/dicom");

    return response;
}

function getJpegParamsObject(iStudyUID, iSeriesUID, iInstanceUID) {
    let params = new URLSearchParams();
    params.append("requestType", "WADO");
    params.append("studyUID", iStudyUID);
    params.append("seriesUID", iSeriesUID);
    params.append("objectUID", iInstanceUID);
    params.append("contentType", "image/jpeg");
    return params;
}