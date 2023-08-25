# raccoon-api-test
This repo is used to test the basic functionality of raccoon's DICOMweb APIs to ensure it is working properly.
- Please refer to the `test` folder for the main testing procedures.

## Configuration
- The following is the example configuration for raccoon's DICOMweb APIs.
```js
module.exports.config = {
    "DICOMwebServer": {
        "baseUrl": "http://localhost",
        "qidoPrefix": "",
        "wadoPrefix": "",
        "stowPrefix": "",
        "wadoUriPrefix": "wado",
        "upsPrefix": ""
    },
    "DIMSE": {
        "aec": "DCMQRSCP",
        "move": {
            "aem": "MOVESCU",
            "port": "1234",
            "outputDir": "/receive"
        },
        "ip": "127.0.0.1",
        "port": "11112"
    }
}
```

### DICOMwebServer
- baseUrl (string): The base URL of the Raccoon.
- qidoPrefix (string): The prefix for the QIDO-RS endpoint.
- wadoPrefix (string): The prefix for the WADO-RS endpoint.
- stowPrefix (string): The prefix for the STOW-RS endpoint.
- wadoUriPrefix (string): The prefix for the WADO-URI endpoint.
- upsPrefix (string): The prefix for the UPS endpoint.

### DIMSE
- aec (string): The Application Entity Title (AETitle) of the Raccoon DIMSE service.
- move.aem (string): The Application Entity Title (AET) of the MOVE-SCU application.
- move.port (string): The port number for the MOVE-SCU application.
- move.outputDir (string): The directory where received files will be stored.
- ip (string): The IP address of the Raccoon DIMSE service.
- port (string): The port number of the Raccoon DIMSE service.


## Usage
- This repo use the [mocha](https://www.npmjs.com/package/mocha) to do test
- This repo's test config file of mocha is located in `test.mocharc.js`
- The following is basic usage
```bash
mocha --config ./test.mocharc.js
```
