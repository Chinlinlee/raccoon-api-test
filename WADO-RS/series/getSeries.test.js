const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const { getMultipartData } = require('../../utils/multipart');

(async ()=> {
    let studyID = "2.16.840.1.113995.3.110.3.0.10118.2000002.278819.649182";
    let seriesID = "2.16.840.1.113995.3.110.3.0.10118.2000002.862753";
    let retrieveSeriesURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/series/${seriesID}`, config.DICOMwebServer.baseUrl);
    console.log(`do WADO-RS retrieve series: ${retrieveSeriesURL.href}`);
    let retrieveResponse = await axios.get(retrieveSeriesURL.href, {
        headers: { 'Accept': 'multipart/related; type="application/dicom"'}
    });
    let multipartData = await getMultipartData(retrieveResponse.data);
    console.log(multipartData);
})();