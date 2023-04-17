
const axios = require('axios').default;
const { URL } = require('url');
const { config } = require('../../config/config');
const { getMultipartData } = require('../../utils/multipart');

(async ()=> {
    let instanceID = "2.16.840.1.113995.3.110.3.0.10118.2000002.862753.3";
    let bulkDataUrlPath =`/api/dicom/instance/${instanceID}/bulkdata/00480105.Value.0.00282000.InlineBinary`;
    let bulkDataStudyURL = new URL(bulkDataUrlPath, config.DICOMwebServer.baseUrl);
    console.log("do retrieve bulk data from:", bulkDataStudyURL.href);
    let bulkDataResponse = await axios.get(bulkDataStudyURL.href, {
        headers: { 'Content-Type': 'multipart/related; type="application/octet-stream"'}
    });
    let multipartData = await getMultipartData(bulkDataResponse.data);
    console.log(multipartData);
})();