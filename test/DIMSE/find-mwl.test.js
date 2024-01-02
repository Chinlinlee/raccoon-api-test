const { spawnSync } = require("child_process");
const { expect } = require("chai");

const { FindScuCmdBuilder } = require("./findScuCmdBuilder");

FindScuCmdBuilder.prototype.setToMwlLevel = function () {
    this.cmd.push("-W");
    return this;
};


class FindScuMwlTester {
    testScheduledProcedureStatus() {
        it("should search ScheduledProcedureStepStatus equal SCHEDULED successful, return 1 mwl", async () => {
            let cmdBuilder = new FindScuCmdBuilder()
                .setToMwlLevel()
                .addKeyAndValue("(0040,0100)[0].0040,0020", "SCHEDULED");
            
            console.log(`do findscu: ${cmdBuilder.getCmd().join(" ")}`);

            let { stdout, stderr } = spawnSync("findscu", cmdBuilder.getCmd());
            let stderrStr = stderr.toString();

            expect(stderrStr).have.string("Find Response: 1 (Pending)");
            expect(stderrStr).not.have.string("Find Response: 2 (Pending)");
        });
    }
}

describe("C-FIND MWL SCP", () => {
    new FindScuMwlTester().testScheduledProcedureStatus();
});