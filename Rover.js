const Rover = (() => {
    let id = 1;
    // Using class expression for Rover declaration.
    // This allows for closure effect with autoincrementing id for
    // each new rover created
    return class Rover {
        constructor() {
            this.id = id++;
        }
    }
})();

module.exports = Rover;