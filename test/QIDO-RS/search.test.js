const path = require("path");
const { expect } = require("chai");
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const fs = require("fs");
const { studyCollection } = require("../../utils/study-collection");

class ParametersTester {
    constructor() {}

    /**
     * Test the (keyword) "PatientName" and (tag) 00100010 of search parameters
     */
    testPatientName() {
        //#region Study
        it("should search PatientName (keyword) successful and return 1 study", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("PatientName", studyCollection[0].PatientName);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search PatientName (tag, 00100010) successful and return 1 study", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00100010", studyCollection[0].PatientName);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        //#endregion

        //#region Patient
        it("should search PatientName (keyword) successful and return 1 patient", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/patients`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("PatientName", studyCollection[0].PatientName);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search PatientName (tag, 00100010) successful and return 1 patient", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/patients`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00100010", studyCollection[0].PatientName);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        //#endregion
    }

    /**
     * Test the (keyword) "PatientID" and (tag) 00100020 of search parameters
     */
    testPatientID() {
        //#region Study
        it("should search PatientID (keyword) successful and return 1 study", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("PatientID", studyCollection[0].PatientID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search PatientID (tag, 00100020) and return 1 study", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00100020", studyCollection[0].PatientID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        //#endregion

        //#regino Patient
        it("should search PatientID (keyword) successful and return 1 patient", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/patients`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("PatientID", studyCollection[0].PatientID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search PatientID (tag, 00100020) and return 1 patient", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/patients`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00100020", studyCollection[0].PatientID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        //#endregion
    }

    /**
     * Test the (keyword) "AccessionNumber" and (tag) 00080050 of search parameters
     */
    testAccessionNumber() {
        it("should search AccessionNumber (keyword) successful and return 1 study", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("AccessionNumber", studyCollection[2].AccessionNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search AccessionNumber (tag, 00080050) successful and return 1 study", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080050", studyCollection[2].AccessionNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
    }

    /**
     * Test the (keyword) "StudyDate" and (tag) 00080020 of search parameters
     */
    testStudyDate() {
        it("should search StudyDate (keyword) exact (eq, 20090721) successful, return 1 study", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("StudyDate", studyCollection[0].StudyDate);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search StudyDate (tag, 00080020) exact (eq, 20090721) successful, return 1 study", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080020", studyCollection[0].StudyDate);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search StudyDate (tag, 00080020) between (20060101-20201231) successful, return 5 studies", async function() {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080020", `20060101-20201231`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(5);
        });

        it("should search StudyDate (tag, 00080020) start from (20090101-) successful, return 4 studies", async function() {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080020", `20090101-`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(4);
        });
        it("should search StudyDate (tag, 00080020) end to (-20091231) successful, return 2 studies", async function() {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080020", `-20091231`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(2);
        });
    }

    testStudyTime() {
        it("should search StudyTime exact (eq, 110509.997000) successful, return 1 study", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("StudyTime", studyCollection[0].StudyTime);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search StudyTime between (0900-1100) successful, return 4 studies", async function() {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("StudyTime", `0900-1100`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(4);
        });

        it("should search StudyTime start from (1000-) successful, return 3 studies", async function() {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080030", `1000-`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(3);
        });

        it("should search StudyTime end to (-1000) successful, return 2 studies", async function() {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("StudyTime", `-1000`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(2);
        });
    }

    testModalitiesInStudy() {
        it("should search ModalitiesInStudy(00080061) equal `ANN` successful, return 1 study and contains 'SM, ANN'", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080061", "ANN");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
            expect(searchResponse.data[0]).to.have.nested.property("00080061.Value").to.have.members(["SM", "ANN"]);
        });
    }


    /**
     * Test the (keyword) "Modality" and (tag) 00080060 of search parameters
     */
    testModality() {
        it("should search Modality (keyword) successful and return 2 series", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("Modality", studyCollection[0].Modality);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(2);
        });
        it("should search Modality (tag, 00080060) successful and return 2 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080060", studyCollection[0].Modality);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(2);
        });
    }

    /**
     * Test the (keyword) "SeriesNumber" and (tag) 00200011 of search parameters
     */
    testSeriesNumber() {
        it("should search SeriesNumber (keyword) successful and return 1 series", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("SeriesNumber", studyCollection[1].SeriesNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search SeriesNumber (tag, 00200011) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00200011", studyCollection[1].SeriesNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
    }

    /**
     * Test the (keyword) "SOPClassUID" and (tag) 00080016 of search parameters
     */
    testSOPClassUID() {
        it("should search SOPClassUID (keyword) successful and return 10 instances", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("SOPClassUID", studyCollection[0].SOPClassUID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(10);
        });
        it("should search SOPClassUID (tag, 00080016) successful and return 10 instances", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00080016", studyCollection[0].SOPClassUID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(10);
        });
    }

    /**
     * Test the (keyword) "InstanceNumber" and (tag) 00200013 of search parameters
     */
    testInstanceNumber() {
        it("should search InstanceNumber (keyword) successful and return 1 instance", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("InstanceNumber", studyCollection[0].InstanceNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
        it("should search InstanceNumber (tag, 00200013) successful and return 1 instance", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00200013", studyCollection[0].InstanceNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        }); 
    }

    /**
     * Test value contains comma (comma-separated, "or query") of search parameters that using tag 00100010 (note: PatientName)
     */
    testCommaValue() {
        it("should search value contains comma successful and return 2 studies", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00100010", `${
                studyCollection[0].PatientName
            },${
                studyCollection[1].PatientName
            }`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(2);
        });
    }

    /**
     * Test value contains splat of search parameters that using tag 00100010 (note: PatientName)
     */
    testSplatValue() {
        it("should search value contains splat successful and return 1 study", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00100010", `${
                studyCollection[0].PatientName.substring(0,2)
            }*`);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
    }
}

describe("Search Transaction Resources (QIDO-RS)", ()=> {

    //#region All Studies
    describe("All Studies, /studies", () => {
        
        it("should search successful and return 5 studies", async()=> {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies`, config.DICOMwebServer.baseUrl);
            console.log(searchURL.href);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(5);
        });
    });
    //#endregion

    //#region Study's Series
    describe("Study's Series, /studies/{studyID}/series", ()=> {
        it("should search successful and return 2 series", async()=> {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${studyCollection[0].studyID}/series`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(2);
        });
        it("should search successful and return 1 series", async()=> {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${studyCollection[1].studyID}/series`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
    });
    //#endregion

    //#region Study's Instances
    describe("Study's Instances, /studies/{studyID}/instances", ()=> {
        it("should search successful and return 10 instances", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${studyCollection[0].studyID}/instances`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(10);
        });
        it("should search successful and return 1 instance", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${studyCollection[1].studyID}/instances`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
    });
    //#endregion

    //region All Series
    describe("All Series, /series", ()=> {
        it("should search successful and return 7 series", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(7);
        });
    });
    //#endregion

    //#region Study's Series' Instances
    describe("Study's Series' Instances, /studies/{studyID}/series/{seriesID}/instances", ()=> {
        it("should search successful and return 5 instances", async()=> {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${
                studyCollection[0].studyID
            }/series/${
                studyCollection[0].seriesID
            }/instances`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(5);
        });
        it("should search successful and return 1 instance", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/studies/${
                studyCollection[1].studyID
            }/series/${
                studyCollection[1].seriesID
            }/instances`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });
    });
    //#endregion

    //#region All Instances
    describe("All Instances, /instances", ()=> {
        it("should search successful and return 16 instance", async() => {
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances`, config.DICOMwebServer.baseUrl);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(17);
        });
    });
    //#endregion

    let parametersTester = new ParametersTester();
    describe("Search Parameters, Study level", ()=> {
        describe("Test value contains comma ('or query') of search parameters using PatientName (tag, 00100010) ", ()=> {
            parametersTester.testCommaValue();
        });
    
        describe("Test value contains splat of search parameters that using tag 00100010 (note: PatientName)", ()=> {
            parametersTester.testSplatValue();
        });
    
        describe("Test the (keyword) 'PatientName' and (tag) 00100010 of search parameters", ()=> {
            parametersTester.testPatientName();
        });
    
        describe("Test the (keyword) 'PatientID' and (tag) 00100020 of search parameters", ()=> {
            parametersTester.testPatientID();
        });
        
        describe("Test the (keyword) 'AccessionNumber' and (tag) 00080050 of search parameters", ()=> {
            parametersTester.testAccessionNumber();
        });
        
        describe("Test the (keyword) 'StudyDate' and (tag) 00080020 of search parameters", ()=> {
            parametersTester.testStudyDate();
        });

        describe("Test the 'StudyTime' of search parameters", ()=> {
            parametersTester.testStudyTime();
        });

        describe("Test the 'ModalitiesInStudy' of search parameters", ()=> {
            parametersTester.testModalitiesInStudy();
        });
    });

    describe("Search Parameters, Series level", ()=> {
        describe("Test the (keyword) 'Modality' and (tag) 00080060 of search parameters", ()=> {
            parametersTester.testModality();
        });
        describe("Test the (keyword) 'SeriesNumber' and (tag) 00200011 of search parameters", ()=> {
            parametersTester.testSeriesNumber();
        });
    });

    describe("Search Parameters, Instance level", ()=> {
        describe("Test the (keyword) 'SOPClassUID' and (tag) 00080016 of search parameters", ()=> {
            parametersTester.testSOPClassUID();
        });

        describe("Test the (keyword) 'InstanceNumber' and (tag) 00200013 of search parameters", ()=> {
            parametersTester.testInstanceNumber();
        });
    });

});