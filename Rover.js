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
    }
})();

module.exports = Rover;