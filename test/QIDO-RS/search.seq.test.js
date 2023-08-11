/**
 * Test sequences query parameters like ggggeeee.ggggeeee
 */

const path = require("path");
const { expect } = require("chai");
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const fs = require("fs");
const { studyCollection } = require("../../utils/study-collection");
const {storeInstance} = require("../../utils/storeInstance");

class SeriesRequestAttributeSequenceParametersTester {
    testAccessionNumber() {
        it("should search AccessionNumber of Series Request Attribute Sequence (tag, 00400275.00080050) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00400275.00080050", studyCollection[5].RequestAttribute.AccessionNumber);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search not exist AccessionNumber of Series Request Attribute Sequence (tag, 00400275.00080050) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00400275.00080050", "foobar");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }

    testIssuerLocalNamespaceEntityID() {
        it("should search LocalNamespaceEntityID of Issuer in Series Request Attribute Sequence (tag, 00400275.00080051.00400031) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00400275.00080051.00400031", studyCollection[5].RequestAttribute.Issuer.NamespaceEntityID);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search not exist LocalNamespaceEntityID of Issuer in Series Request Attribute Sequence (tag, 00400275.00080051.00400031) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/series/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("00400275.00080051.00400031", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }
}

class InstancesConceptNameCodeParametersTester {
    testCodeValue() {
        it("should search CodeValue of Concept Name Code (tag, 0040A043.00080100) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A043.00080100", studyCollection[5].ConceptNameCode.CodeValue);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search not exist CodeValue of Concept Name Code (tag, 0040A043.00080100) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A043.00080100", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }
}

class InstancesContentParametersTester {
    testTextValue() {
        it("should search Text Value of Content (tag, 0040A730.0040A160) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A730.0040A160", studyCollection[5].Content.TextValue);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search Text Value of Content (tag, 0040A730.0040A160) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A043.00080100", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }
    testConceptNameCodeValue() {
        it("should search Code Value of Concept Name Code in Content (tag, 0040A730.0040A043.00080100) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A730.0040A043.00080100", studyCollection[5].Content.ConceptNameCode.CodeValue);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search Code Value of Concept Name Code in Content (tag, 0040A730.0040A043.00080100) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A730.0040A043.00080100", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }

    testConceptCodeValue() {
        
        it("should search Code Value of Concept Code in Content (tag, 0040A730.0040A168.00080100) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A730.0040A168.00080100", studyCollection[5].Content.ConceptCode.CodeValue);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search Code Value of Concept Code in Content (tag, 0040A730.0040A168.00080100) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A730.0040A168.00080100", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }
}

class InstancesVerifyingObserverParametersTester {
    testVerifyingObserverName() {
        it("should search Observer Name of Verifying Observer (tag, 0040A073.0040A075) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A075", studyCollection[5].VerifyingObserver.VerifyingObserverName);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search not exist Observer Name of Verifying Observer (tag, 0040A073.0040A075) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A075", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }

    testVerificationDateTime() {
        it("should search (-20201231) of Verification Date Time of Verifying Observer (tag, 0040A073.0040A030) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A030", "-20201231");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search Verification Date Time of Verifying Observer (tag, 0040A073.0040A030) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A030", studyCollection[5].VerifyingObserver.VerificationDateTime);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search not exist Verification Date Time of Verifying Observer (tag, 0040A073.0040A030) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A030", "-19991212");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        })
    }

    testVerifyingOrganization() {
        it("should search Organization of Verifying Observer (tag, 0040A073.0040A027) successful and return 1 series", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A027", studyCollection[5].VerifyingObserver.VerifyingOrganization);
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(200);
            expect(searchResponse).to.have.property("data");
            expect(searchResponse.data.length).to.equal(1);
        });

        it("should search Organization of Verifying Observer (tag, 0040A073.0040A027) successful", async()=>{
            let searchURL = new URL(`${config.DICOMwebServer.qidoPrefix}/instances/`, config.DICOMwebServer.baseUrl);
            searchURL.searchParams.append("0040A073.0040A027", "foo");
            let searchResponse = await axios.get(searchURL.href, {
                headers: { 'Accept': 'application/dicom+json'}
            });
            expect(searchResponse.status).to.equal(204);
        });
    }
}

describe("Search Transaction Resources (QIDO-RS) with sequence parameters", ()=> {
    before(async () => {
        let dicomFilename = path.join(__dirname, "../../dicomFiles/1-01-mod-vo");
        await storeInstance(dicomFilename);
    });

    describe("Series level parameters", ()=> {
        let requestAttributeSequenceParameterTester = new SeriesRequestAttributeSequenceParametersTester();
        requestAttributeSequenceParameterTester.testAccessionNumber();
        requestAttributeSequenceParameterTester.testIssuerLocalNamespaceEntityID();
    });

    describe("Instance level parameters", () => {
        let instancesConceptNameCodeParameterTester = new InstancesConceptNameCodeParametersTester();
        instancesConceptNameCodeParameterTester.testCodeValue();

        let instancesContentParameterTester = new InstancesContentParametersTester();
        instancesContentParameterTester.testTextValue();
        instancesContentParameterTester.testConceptNameCodeValue();
        instancesContentParameterTester.testConceptCodeValue();

        let instancesVerifyingObserverParametersTester = new InstancesVerifyingObserverParametersTester();
        instancesVerifyingObserverParametersTester.testVerifyingObserverName();
        instancesVerifyingObserverParametersTester.testVerifyingOrganization();
        instancesVerifyingObserverParametersTester.testVerificationDateTime();
    });
});
