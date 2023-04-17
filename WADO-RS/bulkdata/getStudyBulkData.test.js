const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const { getMultipartData } = require('../../utils/multipart');

(async ()=> {
    let studyID = "2.16.840.1.113995.3.110.3.0.10118.2000002.278819.649182";
    let bulkDataStudyURL = new URL(`${config.DICOMwebServer.wadoPrefix}/studies/${studyID}/bulkdata`, config.DICOMwebServer.baseUrl);
    console.log(bulkDataStudyURL.href);
    let bulkDataResponse = await axios.get(bulkDataStudyURL.href, {
        headers: { 'Content-Type': 'multipart/related; type="application/octet-stream"'}
    });
    let multipartData = await getMultipartData(bulkDataResponse.data);
    console.log(multipartData);
})();