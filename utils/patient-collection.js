module.exports.patients = [
    {
        "00100010": {
            "vr": "PN",
            "Value": [
                {
                    "Alphabetic": "John^Doe"
                }
            ]
        },
        "00100020": {
            "vr": "LO",
            "Value": ["12345"]
        },
        "00100021": {
            "vr": "LO",
            "Value": ["Issuer ID"]
        },
        "00100030": {
            "vr": "DA",
            "Value": ["19800101"]
        },
        "00100032": {
            "vr": "TM",
            "Value": ["080000"]
        },
        "00100040": {
            "vr": "CS",
            "Value": ["M"]
        },
        "00101001": {
            "vr": "PN",
            "Value": [
                {
                    "Alphabetic": "Alternate^Name"
                }
            ]
        },
        "00101002": {
            "vr": "SQ",
            "Value": [
                {
                    "00100020": {
                        "vr": "LO",
                        "Value": [
                            "OtherPatientID"
                        ]
                    },
                    "00100022": {
                        "vr": "CS",
                        "Value": [
                            "TEXT"
                        ]
                    }
                }
            ]
        },
        "00102160": {
            "vr": "SH",
            "Value": ["Asian"]
        },
        "00104000": {
            "vr": "LT",
            "Value": ["Patient comments"]
        }
    }
];