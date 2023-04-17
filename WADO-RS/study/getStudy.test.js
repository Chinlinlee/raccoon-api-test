const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const { getMultipartData } = require('../../utils/multipart');

(async ()=> {
    let studyID = "1.3.6.1.4.1.14519.5.2.1.314316487728501506587013300243937537423";
    let retrieveStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}`, config.DICOMwebServer.baseUrl);
    console.log(`do WADO-RS retrieve series: ${retrieveStudyURL.href}`);
    let retrieveResponse = await axios.get(retrieveStudyURL.href, {
        headers: { 'Accept': 'multipart/related; type="application/dicom"'}
    });
    let multipartData = await getMultipartData(retrieveResponse.data);
    console.log(multipartData);
})();