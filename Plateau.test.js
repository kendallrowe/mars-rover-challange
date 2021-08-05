const Plateau = require("./Plateau");
const Rover = require("./Rover");

describe("Plateau initialization tests", () => {
    
    const testPlateau = new Plateau(5, 5)

    test("if Plateau can be initialized with dimensions, ", () => {

        expect(testPlateau.width).toBe(5);
        expect(testPlateau.height).toBe(5);
        expect(testPlateau.rovers.length).toBe(0);
        expect(testPlateau.activeRover).toBeNull();
    });
});

describe("Plateau space checking tests", () => {
    
    const testPlateau = new Plateau(5, 5)
    const testRover = new Rover(0, 0, "N");
    testPlateau.addRover(testRover);

    test("isSpaceInBounds returns true for an inbound space", () => {
        const spaceInBounds = testPlateau.isSpaceInBounds(2, 4);
        expect(spaceInBounds).toBe(true);
    });

    test("isSpaceInBounds returns false for an out of bounds space", () => {
        const spaceInBounds = testPlateau.isSpaceInBounds(23, 44);
        expect(spaceInBounds).toBe(false);
    });

    test("isSpaceFree returns true for an empty space", () => {
        const isSpaceFree = testPlateau.isSpaceFree(3, 3);
        expect(isSpaceFree).toBe(true);
    });

    test("isSpaceFree returns false for an occupied space", () => {
        const testRover2 = new Rover(0, 0, "N");
        testPlateau.addRover(testRover2);

        const isSpaceFree = testPlateau.isSpaceFree(0, 0);
        expect(isSpaceFree).toBe(false);
    });

    test("isSpaceFree returns false for an out of bounds space", () => {
        const isSpaceFree = testPlateau.isSpaceFree(23, 44);
        expect(isSpaceFree).toBe(false);
    });
});

describe("Plateau add rover method tests", () => {
    
    
    test("if plateau can add a rover", () => {
        const testPlateau = new Plateau(5, 5)
        const testRover1 = new Rover(0, 0, "N");
        testPlateau.addRover(testRover1);
        expect(testPlateau.activeRover.x).toBe(0);
    });

    test("if plateau can add a second rover", () => {
        const testPlateau = new Plateau(5, 5)
        const testRover1 = new Rover(0, 0, "N");
        testPlateau.addRover(testRover1);
        expect(testPlateau.activeRover.x).toBe(0);
    });
    
    test("if addition fails when adding a rover to an occupied space", () => {
        const testPlateau = new Plateau(5, 5)
        const testRover1 = new Rover(0, 0, "N");
        const testRover2 = new Rover(0, 0, "N");

        testPlateau.addRover(testRover1);
        testPlateau.addRover(testRover2);
        expect(testPlateau.rovers.length).toBe(2);
        expect(testPlateau.activeRover).toBeNull();
        expect(testPlateau.rovers[1].status).toBe("D");
    });

    test("if addition fails when adding a rover to an out of bounds space", () => {
        const testPlateau = new Plateau(5, 5)
        const testRover1 = new Rover(32, 23, "N");

        testPlateau.addRover(testRover1);
        expect(testPlateau.rovers.length).toBe(1);
        expect(testPlateau.activeRover).toBeNull();
        expect(testPlateau.rovers[1].status).toBe("D");
    });
});


describe("Plateau rover movement tests", () => {

    test("if rover can move forward to an open square", () => {
        const plateau = new Plateau(5, 5);
        plateau.addRover(new Rover(0, 0, "N"));

        plateau.moveActiveRover("M");
        expect(plateau.activeRover.x).toBe(0)
        expect(plateau.activeRover.y).toBe(1)
        expect(plateau.activeRover.status).toBe("A");
    });
    
    test("if rover moves forward out of bounds it is destroyed", () => {
        const plateau = new Plateau(5, 5);
        plateau.addRover(new Rover(0, 0, "S"));

        plateau.moveActiveRover("M");
        expect(plateau.activeRover.x).toBe(-1)
        expect(plateau.activeRover.y).toBe(-1)
        expect(plateau.activeRover.status).toBe("D");
    });

    test("if rover moves forward to an occupied space it is destroyed", () => {
        const plateau = new Plateau(5, 5);
        plateau.addRover(new Rover(1, 0, "N"));
        plateau.addRover(new Rover(0, 0, "E"));

        plateau.moveActiveRover("M");
        expect(plateau.activeRover.x).toBe(-1)
        expect(plateau.activeRover.y).toBe(-1)
        expect(plateau.activeRover.status).toBe("D");
    });
});