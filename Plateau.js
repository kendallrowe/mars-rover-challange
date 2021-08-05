class Plateau {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rovers = [];
        this.activeRover = null
    }

    addRover(rover) {
        if (this.activeRover) {
            this.rovers.push(this.activeRover);
            this.activeRover = null
        }

        this.activeRover = rover

        if (this.isSpaceInBounds(rover.x, rover.y) && this.isSpaceFree(rover.x, rover.y)) {
            console.log(`Rover ${rover.id} has landed!`)
        } else {
            console.log(`Oh the humanity! Rover ${rover.id} has crashed!`)
            this.activeRover = null
            rover.destroy()
            this.rovers.push(rover);
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
            return rover.status !== "D" && rover.x === x && rover.y === y;
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
}

module.exports = Plateau;