const Rover = require("./Rover");

describe("Rover initialization tests", () => {
    
    const testRover = new Rover(1, 0, 0, "N");

    test("if rover can be initialized with id", () => {
        expect(testRover.id).toBe(1);
    });

    test("if rovers can be intialized with different ids", () => {
        const secondRover = new Rover(2, 1, 1, "E");
        expect(testRover.id).toBe(1);
        expect(secondRover.id).toBe(2);
    });

    test("if rover can be initialized with landing coordinates and direction", () => {
        expect(testRover.x).toBe(0);
        expect(testRover.y).toBe(0);
        expect(testRover.direction).toBe("N");
        expect(testRover.status).toBe("Active");
    });
});

describe("Rover destruction test", () => {
    test("if rover status and coordinates correctly update when destroyed", () => {
        const testRover = new Rover(1, 0, 0, "N");

        testRover.destroy();
        expect(testRover.x).toBe(-1);
        expect(testRover.y).toBe(-1);
        expect(testRover.status).toBe("Destroyed");

    });
});

describe("Rover movement tests", () => {

    test("if rover can return destination coordinates of a forward move", () => {
        const testRover = new Rover(1, 0, 0, "N");

        const dest = testRover.findDestinationCoordinates();
        expect(dest[0]).toBe(0);
        expect(dest[1]).toBe(1);
    });

    test("if rover can move 1 unit north", () => {
        const testRover = new Rover(1, 2, 2, "N")

        testRover.moveForward();
        expect(testRover.x).toBe(2);
        expect(testRover.y).toBe(3);
    });

    test("if rover can move 1 unit east", () => {
        const testRover = new Rover(1, 2, 2, "E");

        testRover.moveForward();
        expect(testRover.x).toBe(3);
        expect(testRover.y).toBe(2);
    });

    test("if rover can move 1 unit south", () => {
        const testRover = new Rover(1, 2, 2, "S");

        testRover.moveForward();
        expect(testRover.x).toBe(2);
        expect(testRover.y).toBe(1);
    });

    test("if rover can move 1 unit west", () => {
        const testRover = new Rover(1, 2, 2, "W");

        testRover.moveForward();
        expect(testRover.x).toBe(1);
        expect(testRover.y).toBe(2);
    });

    test("if rover can turn left", () => {
        const testRover = new Rover(1, 0, 0, "N");

        testRover.turn("L");
        expect(testRover.direction).toBe("W");
    });

    test("if rover can turn right", () => {
        const testRover = new Rover(1, 0, 0, "N");

        testRover.turn("R");
        expect(testRover.direction).toBe("E");
    });
});