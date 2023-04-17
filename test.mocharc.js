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
        "test/WADO-RS/retrieveInstances.test.js",
        "test/WADO-RS/retrieveRendered.test.js",
        "test/WADO-RS/metadata.test.js",
        "test/QIDO-RS/search.test.js",
        "test/WADO-URI/retrieveInstance.test.js"
    ],
    "sort": false
}
