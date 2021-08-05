class Plateau {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rovers = [];
        this.activeRover = null
    }

    activateRoverById(id) {
        const roverToActivate = this.rovers.find(rover => rover.id === id);

        if (roverToActivate) {
            this.rovers = this.rovers.filter(rover => rover.id !== id);
            this.activeRover = roverToActivate;
            this.activeRover.status = "Active";
        }

        return this.activeRover;
    }

    addRover(rover) {
        this.deactivateRover()

        this.activeRover = rover
        this.activeRover.status = "Active"
        
        if (this.rovers.find(currentRover => currentRover.id === rover.id)) {
            console.log(`Tried to create a rover with an id that already exists. Activating rover ${rover.id}`);
            this.activeRover = null;
            this.activateRoverById(rover.id);
        } else if (this.isSpaceInBounds(rover.x, rover.y) && this.isSpaceFree(rover.x, rover.y)) {
            console.log(`Rover ${rover.id} has landed!`)

        } else {
            console.log(`Oh the humanity! Rover ${rover.id} has crashed!`)
            this.activeRover.destroy()
            this.rovers.push(this.activeRover);
            this.activeRover = null
        }
    }
    
    deactivateRover() {
        if (this.activeRover) {
            this.activeRover.status = "Idle"
            this.rovers.push(this.activeRover);
            this.activeRover = null
        }
    }

    isSpaceInBounds(x, y) {
        if (x > this.width - 1 || y > this.height - 1) {
            return false
        }

        if (x < 0 || y < 0) {
            return false
        }

        return true
    }

    isSpaceFree(x, y) {
        if (!this.isSpaceInBounds(x, y)) {
            return false
        }

        const foundRover = this.rovers.find(rover => {
            return rover.status !== "Destroyed" && rover.x === x && rover.y === y;
        });

        if (foundRover) {
            return false
        }

        return true
    }

    moveActiveRover(cmd) {
        if (!this.activeRover) {
            return false;
        }

        if (cmd === "L" || cmd === "R") {
            this.activeRover.turn(cmd);
        } else {
            const destination = this.activeRover.findDestinationCoordinates();
            if (this.isSpaceFree(destination[0], destination[1])) {
                this.activeRover.moveForward();
            } else {
                console.log(`Oh the humanity! Rover ${this.activeRover.id} has crashed!`)
                this.activeRover.destroy()
                this.rovers.push(this.activeRover);
                this.activeRover = null
            }
        }
    }

    returnActiveRovers() {
        this.deactivateRover()

        return this.rovers.filter(rover => rover.status === "Idle")
    }
}

module.exports = Plateau;