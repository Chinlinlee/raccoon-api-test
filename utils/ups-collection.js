/**
 * @see {@link https://github.com/microsoft/dicom-server/blob/main/docs/resources/Conformance-as-Postman.postman_collection.json| microsoft/dicom-server conformance as postman}
 */
module.exports.workItemTestData1 = [
    {
        "00081080": {
            "vr": "LO",
            "Value": [
                "Admitting Diagnoses Description"
            ]
        },
        "00081084": {
            "vr": "SQ",
            "Value": [
                {
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Code Meaning"
                        ]
                    }
                }
            ]
        },
        "00081195": {
            "vr": "UI"
        },
        "00100010": {
            "vr": "PN",
            "Value": [
                {
                    "Alphabetic": "Last^First"
                }
            ]
        },
        "00100020": {
            "vr": "LO",
            "Value": [
                "11111"
            ]
        },
        "00100021": {
            "vr": "LO"
        },
        "00100024": {
            "vr": "SQ"
        },
        "00100030": {
            "vr": "DA",
            "Value": [
                "20000101"
            ]
        },
        "00100040": {
            "vr": "CS",
            "Value": [
                "F"
            ]
        },
        "00101002": {
            "vr": "SQ"
        },
        "00104000": {
            "vr": "LT",
            "Value": [
                "Patient Comments"
            ]
        },
        "00321033": {
            "vr": "LO",
            "Value": [
                "123"
            ]
        },
        "00380010": {
            "vr": "LO",
            "Value": [
                "11111"
            ]
        },
        "00380014": {
            "vr": "SQ",
            "Value": [
                {
                    "00400031": {
                        "vr": "UT",
                        "Value": ["123456789"]
                    },
                    "00400032": {
                        "vr": "UT",
                        "Value": ["29c737e3-b739-4169-aca7-eea07a808643"]
                    },
                    "00400033": {
                        "vr": "CS",
                        "Value": ["UUID"]
                    }
                }
            ]
        },
        "00400400": {
            "vr": "LT"
        },
        "00401001": {
            "vr": "SH",
            "Value": [
                "123"
            ]
        },
        "00404005": {
            "vr": "DT",
            "Value": [
                "20211202115531.193"
            ]
        },
        "00404010": {
            "vr": "DT",
            "Value": [
                "20211202115531.193"
            ]
        },
        "00404018": {
            "vr": "SQ",
            "Value": [
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "ABC123"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "123ABC"
                        ]
                    },
                    "00080103": {
                        "vr": "SH",
                        "Value": [
                            "1.0"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Requested procedure"
                        ]
                    }
                }
            ]
        },
        "00404021": {
            "vr": "SQ"
        },
        "00404025": {
            "vr": "SQ",
            "Value": [
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "ABC_123"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "123ABC"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Station name"
                        ]
                    }
                },
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "DEF_456"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "123ABC"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Station name"
                        ]
                    }
                }
            ]
        },
        "00404026": {
            "vr": "SQ",
            "Value": [
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "ABC"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "AAA"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Station class"
                        ]
                    }
                },
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "ABC"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "AAA"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Station class"
                        ]
                    }
                }
            ]
        },
        "00404027": {
            "vr": "SQ",
            "Value": [
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "ABC_1"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "DEF"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Geographic location"
                        ]
                    }
                },
                {
                    "00080100": {
                        "vr": "SH",
                        "Value": [
                            "ABC_2"
                        ]
                    },
                    "00080102": {
                        "vr": "SH",
                        "Value": [
                            "DEF"
                        ]
                    },
                    "00080104": {
                        "vr": "LO",
                        "Value": [
                            "Geographic location"
                        ]
                    }
                }
            ]
        },
        "00404041": {
            "vr": "CS",
            "Value": [
                "READY"
            ]
        },
        "0040A370": {
            "vr": "SQ",
            "Value": [
                {
                    "00080050": {
                        "vr": "SH",
                        "Value": [
                            "1234567"
                        ]
                    },
                    "00080051": {
                        "vr": "SQ"
                    },
                    "00080090": {
                        "vr": "PN",
                        "Value": [
                            {
                                "Alphabetic": "Last^First^^Dr"
                            }
                        ]
                    },
                    "0020000D": {
                        "vr": "UI",
                        "Value": [
                            "2.25.00000000000000000000000000000000"
                        ]
                    },
                    "00321060": {
                        "vr": "LO",
                        "Value": [
                            "Requested procedure description"
                        ]
                    },
                    "00321064": {
                        "vr": "SQ",
                        "Value": [
                            {
                                "00080100": {
                                    "vr": "SH",
                                    "Value": [
                                        "GHI123"
                                    ]
                                },
                                "00080102": {
                                    "vr": "SH",
                                    "Value": [
                                        "789JKL"
                                    ]
                                },
                                "00080104": {
                                    "vr": "LO",
                                    "Value": [
                                        "Requested procedure"
                                    ]
                                }
                            }
                        ]
                    },
                    "00400026": {
                        "vr": "SQ"
                    },
                    "00400027": {
                        "vr": "SQ"
                    },
                    "00401001": {
                        "vr": "SH",
                        "Value": [
                            "123"
                        ]
                    },
                    "00401400": {
                        "vr": "LT",
                        "Value": [
                            "Requested Cataract surgery procedure comments"
                        ]
                    }
                }
            ]
        },
        "00741000": {
            "vr": "CS",
            "Value": [
                "SCHEDULED"
            ]
        },
        "00741002": {
            "vr": "SQ"
        },
        "00741200": {
            "vr": "CS",
            "Value": [
                "MEDIUM"
            ]
        },
        "00741202": {
            "vr": "LO",
            "Value": [
                "WORKLIST"
            ]
        },
        "00741204": {
            "vr": "LO",
            "Value": [
                "Scheduled procedure step description"
            ]
        },
        "00741210": {
            "vr": "SQ"
        },
        "00741216": {
            "vr": "SQ"
        },
        "0040e020": {
            "vr": "CS",
            "Value": [
                "Type of Instances"
            ]
        },
        "00081199": {
            "vr": "SQ",
            "Value": [
                {
                    "00081150": {
                        "vr": "UI",
                        "Value": [
                            "2.5.0000000"
                        ]
                    },
                    "00081155": {
                        "vr": "UI",
                        "Value": [
                            "2.5.1000000"
                        ]
                    }
                }
            ]
        },
        "00404034": {
            "vr": "SQ",
            "Value": [
                {
                    "00404009": {
                        "vr": "SQ",
                        "Value": [
                            {
                                "00080100": {
                                    "vr": "SH",
                                    "Value": [
                                        "DR123"
                                    ]
                                },
                                "00080102": {
                                    "vr": "SH",
                                    "Value": [
                                        "789JKL"
                                    ]
                                },
                                "00080104": {
                                    "vr": "LO",
                                    "Value": [
                                        "9Y7WZ3JXV4R6HAF"
                                    ]
                                }
                            }
                        ]
                    },
                    "00404036": {
                        "vr": "LO",
                        "Value": [
                            "Dream Home Real Estate Service"
                        ]
                    },
                    "00404037": {
                        "vr": "PN",
                        "Value": [
                            {
                                "Alphabetic": "Humberto^Funk"
                            }
                        ]
                    }
                }
            ]
        }
    }
];

module.exports.upsInstanceUID1 = "2.25.304735844106676112282377091360345596551";

module.exports.transactionUID1 = "2.25.263567342483919614077922593493084515368";