const Rover = require("./Rover");
const Board = require("./Board");

describe("Rover initialization tests", () => {
    
    const testRover = new Rover(0, 0, "N")

    test("if rover can be initialized with id generated automatically", () => {
        expect(testRover.id).toBe(1)
    });

    test("if rover id increments with each new rover generated", () => {
        const secondRover = new Rover(1, 1, "E")
        expect(testRover.id).toBe(1)
        expect(secondRover.id).toBe(2)
    });

    test("if rover can be initialized with landing coordinates and direction", () => {
        expect(testRover.x).toBe(0);
        expect(testRover.y).toBe(0);
        expect(testRover.direction).toBe("N");
        expect(testRover.status).toBe("A");
    });
});

describe("Rover destruction test", () => {
    test("if rover status and coordinates correctly update when destroyed", () => {
        const testRover = new Rover(0, 0, "N");

        testRover.destroy();
        expect(testRover.x).toBe(-1)
        expect(testRover.y).toBe(-1)
        expect(testRover.status).toBe("D");

    });
});

describe("Rover movement tests", () => {
    const board = new Board();

    test("if rover can return destination coordinates of a forward move", () => {
        const testRover = new Rover(0, 0, "N")

        const dest = testRover.findDestinationCoordinates();
        expect(dest[0]).toBe(0);
        expect(dest[1]).toBe(1);
    });
    
    test("if rover can move forward to an open square", () => {
        board.addRover(new Rover(0, 0, "N"));

        board.moveActiveRover("M");
        expect(board.activeRover.x).toBe(0)
        expect(board.activeRover.y).toBe(1)
        expect(board.activeRover.status).toBe("A");
    });
    
    test("if rover moves forward out of bounds it is destroyed", () => {
        board.addRover(new Rover(0, 0, "S"));

        board.moveActiveRover("M");
        expect(board.activeRover.x).toBe(-1)
        expect(board.activeRover.y).toBe(-1)
        expect(board.activeRover.status).toBe("D");
    });

    test("if rover moves forward to an occupied space it is destroyed", () => {
        board.addRover(new Rover(1, 0, "N"));
        board.addRover(new Rover(0, 0, "E"));

        board.moveActiveRover("M");
        expect(board.activeRover.x).toBe(-1)
        expect(board.activeRover.y).toBe(-1)
        expect(board.activeRover.status).toBe("D");
    });

    test("if rover can turn left", () => {
        const testRover = new Rover(0, 0, "N")

        testRover.move("L");
        expect(testRover.direction).toBe("W")
    });

    test("if rover can turn right", () => {
        const testRover = new Rover(0, 0, "N")

        testRover.move("R");
        expect(testRover.direction).toBe("E")
    });
});