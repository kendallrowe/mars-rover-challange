const Mission = require("./Mission");
const Plateau = require("./Plateau");

describe("Mission initialization tests", () => {
    
    const instructions = `Plateau:5 5
    Rover1 Landing:1 2 N
    Rover1 Instructions:LMLMLMLMM
    Rover2 Landing:3 3 E
    Rover2 Instructions:MMRMMRMRRM`;

    const plateau = new Plateau(5, 5);
    const testMission = new Mission(instructions, plateau);

    test("if Mission can be initialized with instructions and plateau", () => {
        expect(testMission.instructions).toBe(instructions);
        expect(testMission.board.width).toBe(5);
    });
});
