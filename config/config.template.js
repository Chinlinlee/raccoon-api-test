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
        "port": "11112",
        "tls": {
            // The tls use dcm4che store scp to test, please download dcm4che
            "enabled": false,
            "key": "",
            "dcm4che-storescp-bin-path": ""
        }
    }
}