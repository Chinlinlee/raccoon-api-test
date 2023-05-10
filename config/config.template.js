module.exports.config = {
    "DICOMwebServer": {
        "baseUrl": "http://localhost",
        "qidoPrefix": "",
        "wadoPrefix": "",
        "stowPrefix": "",
        "wadoUriPrefix": "wado"
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