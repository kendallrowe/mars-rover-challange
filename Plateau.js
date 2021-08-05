class Plateau {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rovers = [];
        this.activeRover = null;
    }

    activateRoverById(id) {
        if (this.activeRover && this.activeRover.id === id) {
            return this.activeRover;
        }

        this.deactivateRover();
        const roverToActivate = this.rovers.find(rover => rover.id === id);

        if (roverToActivate) {
            this.rovers = this.rovers.filter(rover => rover.id !== id);
            this.activeRover = roverToActivate;
            this.activeRover.status = "Active";
        }

        return this.activeRover;
    }

    addRover(rover) {
        this.deactivateRover();

        this.activeRover = rover;
        this.activeRover.status = "Active";
        
        // Check if rover with same id already exists on the plateau.
        // If it does do not create a new rover and instead activate current
        if (this.rovers.find(currentRover => currentRover.id === rover.id)) {
            console.log(`Tried to create a rover with an id that already exists. Activating rover ${rover.id}`);
            this.activeRover = null;
            this.activateRoverById(rover.id);
            // If valid landing coordinates given, give success landing message
        } else if (this.isSpaceInBounds(rover.x, rover.y) && this.isSpaceFree(rover.x, rover.y)) {
            console.log(`Rover${rover.id} has landed at [${rover.x}, ${rover.y}]!`);
        } else {
            // If invalid landing coordinate was selected, crash and destroy rover
            console.log(`Oh the humanity! Rover ${rover.id} has crashed!`);
            this.activeRover.destroy();
            this.rovers.push(this.activeRover);
            this.activeRover = null;
        }
    }
    
    deactivateRover() {
        if (this.activeRover) {
            this.activeRover.status = "Idle";
            this.rovers.push(this.activeRover);
            this.activeRover = null;
        }
    }

    findRoverByDestination(x, y) {
        return this.rovers.find(rover => {
            return rover.status !== "Destroyed" && rover.x === x && rover.y === y;
        });
    }

    isSpaceInBounds(x, y) {
        if (x > this.width || y > this.height) {
            return false;
        }

        if (x < 0 || y < 0) {
            return false;
        }

        return true;
    }

    isSpaceFree(x, y) {
        if (!this.isSpaceInBounds(x, y)) {
            return false;
        }

        const foundRover = this.findRoverByDestination(x, y);

        if (foundRover) {
            return false;
        }

        return true;
    }

    moveActiveRover(cmd) {
        if (!this.activeRover) {
            return;
        }
        // Call turn method on rover if valid turning command given
        if (cmd === "L" || cmd === "R") {
            this.activeRover.turn(cmd);
            console.log(`Rover${this.activeRover.id} turned "${this.activeRover.direction}"`);
        } else {
            // Determine the destination coordinates based on active rovers current location and orientation
            const destination = this.activeRover.findDestinationCoordinates();
            
            // Trigger different events based on status of destination square
            if (this.isSpaceFree(destination[0], destination[1])) {
                // Successful move for valid destination
                console.log(`Rover${this.activeRover.id} has moved to [${destination}]`);
                this.activeRover.moveForward();
            } else {
                // Crash destruction event and determine cause for console logging
                console.log(`Oh the humanity! Rover ${this.activeRover.id} has crashed!`);

                if (!this.isSpaceInBounds(destination[0], destination[1])) {
                    console.log("Tried to move out of bounds on to ", destination);
                } else {
                    const collidedRover = this.findRoverByDestination(destination[0], destination[1]);
                    console.log(`Tried to move in to space  [${destination}] but Rover${collidedRover.id} was already there!`);
                }
                this.activeRover.destroy();
                this.rovers.push(this.activeRover);
                this.activeRover = null;
            }
        }
    }
}

module.exports = Plateau;