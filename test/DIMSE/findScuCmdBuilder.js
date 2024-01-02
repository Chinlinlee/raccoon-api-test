const { config } = require("../../config/config");

class FindScuCmdBuilder {
    constructor() {
        /** 
         * @type {string[]}
         * @private
         */
        this.cmd = [
            "-aet",
            "ANYSCU",
            "-aec",
            config.DIMSE.aec,
            "-v",
            config.DIMSE.ip,
            config.DIMSE.port,
        ]
    }

    addKeyAndValue(key, value) {
        this.cmd.push("-k");
        this.cmd.push(`${key}=${value}`);
        return this;
    }

    setToPatientLevel() {
        this.cmd.push("-P");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=PATIENT");
        return this;
    }

    setToStudyLevel() {
        this.cmd.push("-S");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=STUDY");
        return this;
    }

    setToSeriesLevel() {
        this.cmd.push("-S");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=SERIES");
        return this;
    }

    setToInstanceLevel() {
        this.cmd.push("-S");
        this.cmd.push("-k");
        this.cmd.push("0008,0052=IMAGE");
        return this;
    }

    getCmd() {
        return this.cmd;
    }
}

module.exports.FindScuCmdBuilder = FindScuCmdBuilder;