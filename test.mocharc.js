module.exports = {
    "diff": true,
    "extension": ["js", "cjs", "mjs"],
    "package": "./package.json",
    "reporter": "spec",
    "slow": "75",
    "timeout": "3000000",
    "ui": "bdd",
    "parallel": false,
    "file": [
        "test/STOW-RS/stow-rs.test.js",
        "test/QIDO-RS/search.test.js",
        "test/WADO-RS/retrieveInstances.test.js",
        "test/WADO-RS/retrieveRendered.test.js",
        "test/WADO-RS/metadata.test.js",
        "test/WADO-RS/retrieveThumbnail.test.js",
        "test/WADO-URI/retrieveInstance.test.js",
        "test/DIMSE/store-instnace.test.js",
        "test/DIMSE/find.test.js",
        "test/DIMSE/move.test.js",
        "test/UPS-RS/create.test.js",
        "test/UPS-RS/get.test.js",
        "test/UPS-RS/update.test.js",
        "test/UPS-RS/change-state.test.js"
    ],
    "sort": false
}
