const Rover = (() => {
    let id = 1;
    // Using class expression for Rover declaration.
    // This allows for closure effect with autoincrementing id for
    // each new rover created
    return class Rover {
        constructor(x, y, direction) {
            this.id = id++;
            this.x = x;
            this.y = y;
            this.direction = direction;
            this.status = "A"
        }

        destroy() {
            this.x = -1;
            this.y = -1;
            this.status = "D";
        }

        findDestinationCoordinates() {
            const compassMap = {
                N: [0, 1],
                E: [1, 0],
                S: [0, -1],
                W: [-1, 0]
            }

            const movementChange = compassMap[this.direction];

            return [this.x + movementChange[0], this.y + movementChange[1]];
        }

        moveForward() {
            const movementChange = this.findDestinationCoordinates()

            this.x = movementChange[0];
            this.y = movementChange[1];
        }

        turn(cmd) {
            const compass = ["N", "E", "S", "W"];

            let dirInd = compass.indexOf(this.direction);
            if (cmd === "L" && dirInd === 0) {
                dirInd = compass.length;
            } else if (cmd === "R" && dirInd === compass.length - 1) {
                dirInd = -1;
            }

            const turnAdjustment = cmd === "R" ? 1 : -1;

            this.direction = compass[dirInd + turnAdjustment];
        }
    }
})();

module.exports = Rover;