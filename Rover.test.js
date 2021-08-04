const Rover = require("./Rover");

describe("Rover tests", () => {
    
    const testRover = new Rover()

    test("if rover can be initialized with id generated automatically", () => {
        expect(testRover.id).toBe(1)
    });

    test("if rover id incredments with each new rover generated", () => {
        const secondRover = new Rover()
        expect(testRover.id).toBe(1)
        expect(secondRover.id).toBe(2)
    });
});