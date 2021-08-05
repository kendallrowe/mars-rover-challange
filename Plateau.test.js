const Plateau = require("./Plateau");
const Rover = require("./Rover");

describe("Plateau initialization tests", () => {
    
    const testPlateau = new Plateau(0, 0, "N")

    test("if Plateau can be initialized with dimensions, ", () => {
        expect(testPlateau.x).toBe(0);
        expect(testPlateau.y).toBe(0);
        expect(testPlateau.direction).toBe("N");
        expect(testPlateau.status).toBe("A");
    });
});
