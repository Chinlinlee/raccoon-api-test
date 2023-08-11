const studyCollection = [
    {
        studyID: "1.3.6.1.4.1.14519.5.2.1.314316487728501506587013300243937537423",
        seriesID: "1.3.6.1.4.1.14519.5.2.1.221836838978562134707583793712566401639",
        instanceID: "1.3.6.1.4.1.14519.5.2.1.26977489569839622633788865854297140673",
        PatientName: "GLIOMA01-i_03A6",
        PatientID: "GLIOMA01-i_03A6",
        StudyDate: "20090721",
        StudyTime: "110509.997000",
        Modality: "MR",
        SeriesNumber: "2",
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.4",
        InstanceNumber: "10"
    },
    {
        studyID: "1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170",
        seriesID: "1.2.826.0.1.3680043.8.1055.1.20111102150758591.96842950.07877442",
        instanceID: "1.2.826.0.1.3680043.8.1055.1.20111102150758591.03296050.69180943",
        PatientName: "Anonymized",
        StudyDate: "20061012",
        StudyTime: "090258.000000",
        Modality: "CT",
        SeriesNumber: "6168",
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.2",
        InstanceNumber: "1"
    },
    { //WSI
        studyID: "2.16.840.1.113995.3.110.3.0.10118.2000002.278819.649182",
        seriesID: "2.16.840.1.113995.3.110.3.0.10118.2000002.862753",
        instanceID: "2.16.840.1.113995.3.110.3.0.10118.2000002.862753.1",
        AccessionNumber: "RTD-810--E-01-40",
        StudyDate: "20200731",
        StudyTime: "104639.000",
        Modality: "SM",
        SeriesNumber: "1",
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.77.1.6",
        InstanceNumber: "1"
    },
    { //WSI 2
        studyID: "2.16.840.1.113995.3.110.3.0.10118.2000002.198526.54628",
        seriesID: "2.16.840.1.113995.3.110.3.0.10118.2000002.922101",
        instanceID: "2.16.840.1.113995.3.110.3.0.10118.2000002.922101.2",
        AccessionNumber: "RTD-428--Q-08-06",
        StudyDate: "20200731",
        StudyTime: "104709.000",
        Modality: "SM",
        SeriesNumber: "1",
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.77.1.6",
        InstanceNumber: "2"
    },
    { //jpeg-2000
        studyID: "1.3.46.670589.45.1.1.4993912214784.1.5436.1538560373543",
        seriesID: "1.3.46.670589.45.1.1.4993912214784.1.5436.1538560606509.3",
        instanceID: "1.3.6.1.4.1.5962.99.1.3002151337.1017604488.1540600476073.6.0",
        AccessionNumber: "D18-1001",
        StudyDate: "20181003",
        StudyTime: "095253",
        Modality: "SM",
        SeriesNumber: "1",
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.77.1.6",
        InstanceNumber: "1"
    },
    { //
        studyID: "1.3.6.1.4.1.14519.5.2.1.314316487728501506587013300243937537423",
        seriesID: "1.3.6.1.4.1.14519.5.2.1.62266640231940987006694557463549207147",
        instanceID: "1.2.276.0.7230010.3.1.4.2304755699.3648.1691733220.920",
        AccessionNumber: "5201212",
        StudyDate: "20090721",
        StudyTime: "110509.997000",
        Modality: "MR",
        SeriesNumber: "13",
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.4",
        InstanceNumber: "224",
        RequestAttribute: {
            AccessionNumber: "123456789",
            Issuer: {
                NamespaceEntityID: "fuckyou"
            }
        },
        ConceptNameCode: {
            CodeValue: "Test"
        },
        Content: {
            TextValue: "Test",
            ConceptNameCode: {
                CodeValue: "Test 2",
                CodingSchemeDesignator: "LFUCK2",
                CodingSchemeVersion: "v2.0",
                CodeMeaning: "For Test 2"
            },
            ConceptCode: {
                CodeValue: "Test 2",
                CodingSchemeDesignator: "LFUCK2",
                CodingSchemeVersion: "v2.0",
                CodeMeaning: "For Test 2"
            }
        },
        VerifyingObserver: {
            VerifyingOrganization: "Test Org",
            VerificationDateTime: "20200202121212.121212",
            VerifyingObserverName: "fakeName"
        }
    }
];


module.exports.studyCollection = studyCollection;