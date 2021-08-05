const Plateau = require("./Plateau");
const Rover = require("./Rover");

class Mission {
    constructor(instructions = "") {
        this.instructions = instructions;
        this.plateau = null
    }

    executeInstructions(instructions = this.instructions) {
        console.log("Beginning execution of: ", instructions)
        console.log("===============================")
        const lines = instructions.split("\n");

        for(let i = 0; i < lines.length; i++) {
            this.readLine(lines[i])
        }

        this.outputMissionResults()
    }

    outputMissionResults() {
        this.plateau.deactivateRover()
        if (!this.plateau) {
            console.log("You haven't set a plateau yet. No mission has been executed.")
        } else {
            for (const rover of this.plateau.rovers) {
                if (rover.status === "Destroyed") {
                    console.log(`Oops... Looks like Rover${rover.id} didn't make it. Better luck next time.`)
                } else {
                    console.log(`Rover${rover.id}: ${rover.x} ${rover.y} ${rover.direction}`)
                }
            }
        }
    }

    readLine(line) {
        if (line.includes("Plateau:")) {
            this.readPlateauCreation(line);
        } else if (line.includes("Landing:")) {
            this.readRoverLanding(line);
        } else if (line.includes("Instructions:")) {
            this.readRoverMovement(line);
        } else if (line.trim()) {
            console.log(`Invalid line: ${line}`);
        }
    }

    readPlateauCreation(line) {
        const dimensions = line.substring(line.indexOf("Plateau:") + 8);
        const dimensionArr = dimensions.split(" ").map(ele => parseInt(ele));

        if (dimensionArr.filter(ele => ele).length !== 2) {
            console.log(`Invalid line: ${line}.`);
            return
        }

        this.plateau = new Plateau(dimensionArr[0], dimensionArr[1]);

    }

    readRoverLanding(line) {
        const landingIndex = line.indexOf("Landing:");

        const roverId = parseInt(line.substring(5, landingIndex - 1));

        const roverCoords = line.substring(landingIndex + 8).split(" ")

        if (!roverId || roverCoords.length !== 3) {
            console.log(`Invalid line: ${line}`);
            return
        }

        if (!this.plateau) {
            console.log("No plateau has been created yet! Create somewhere to land first.");
            return
        }

        const [x, y, direction] = roverCoords;

        this.plateau.addRover(new Rover(roverId, parseInt(x), parseInt(y), direction))
    }

    readRoverMovement(line) {
        const instructionIndex = line.indexOf("Instructions:");

        const roverId = parseInt(line.substring(5, instructionIndex - 1));

        const roverInstructions = line.substring(instructionIndex + 13)

        if (!roverId) {
            console.log(`Invalid line: ${line}`);
            return
        }

        this.plateau.activateRoverById(roverId);

        for (let i = 0; i < roverInstructions.length; i++) {
            const cmd = roverInstructions.charAt(i)
            if (this.plateau.activeRover){
                if (["L", "R", "M"].includes(cmd)) {
                    this.plateau.moveActiveRover(cmd)
                } else {
                    console.log(`Found invalid character "${cmd}" when reading instructions: "${roverInstructions}" in line ${line}. Skipping this instruction.`)
                }
            } else {
                break;
            }

        }

        console.log(`Movement ended for Rover${roverId}`)
    }
}

module.exports = Mission;