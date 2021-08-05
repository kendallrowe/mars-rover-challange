const Plateau = require("./Plateau");
const Mission = require("./Mission");
const Rover = require("./Rover");

const fs = require("fs");

fs.readFile("input.txt", (err, instructions) => {
    if (err) throw err;

    const mission = new Mission(instructions.toString())
    mission.executeInstructions()
})