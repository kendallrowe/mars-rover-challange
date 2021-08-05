const Mission = require("./Mission");

const fs = require("fs");

fs.readFile("input.txt", (err, instructions) => {
    if (err) throw err;

    const mission = new Mission(instructions.toString())
    mission.executeInstructions()
})