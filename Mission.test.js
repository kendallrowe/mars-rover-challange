const Mission = require("./Mission");
const Plateau = require("./Plateau");

describe("Mission initialization tests", () => {
    
    const instructions = `Plateau:5 5
    Rover1 Landing:1 2 N
    Rover1 Instructions:LMLMLMLMM
    Rover2 Landing:3 3 E
    Rover2 Instructions:MMRMMRMRRM`;

    const testMission = new Mission(instructions);
    
    test("if Mission can be initialized with instructions", () => {
        expect(testMission.instructions).toBe(instructions);
        expect(testMission.plateau).toBeNull();
    });
});

describe("Read line method tests", () => {
    // Line by line parser
    const testMission = new Mission(instructions);
    
    test("if read line of plateau correctly instantiates a plateau on to the mission", () => {
        // Plateau set up reading
        const instruction = "Plateau:5 5"

        testMission.readLine(instruction);
        expect(testMission.plateau.width).toBe(5);
    });

    test("if read line of landing of rover correctly instantiates a rover and activates it", () => {
        // Create rover from landing instructions
        const instruction = "Rover1 Landing:1 2 N"

        testMission.readLine(instruction);
        expect(testMission.plateau.width).toBe(5);
    });

    test("if read line of movement instruction moves a rover", () => {
        // Rover Movement execution
        const instruction = "Rover1 Instructions:LMLMLMLMM"

        testMission.readLine(instruction);
        expect(testMission.plateau.width).toBe(5);
    });

    test("if read line of movement instruction for a destroyed rover triggers no event", () => {
        // Rover Movement execution
        const instruction = "Rover1 Instructions:LMLMLMLMM"

        testMission.readLine(instruction);
        expect(testMission.plateau.width).toBe(5);
    });
});

describe("Multiple rover method tests", () => {
    test("if read line of plateau correctly instantiates a plateau on to the mission", () => {
        // Rover Movement execution
        const instruction = "Rover1 Instructions:LMLMLMLMM"

        testMission.readLine(instruction);
        expect(testMission.plateau.width).toBe(5);
    });

    test("if read line of plateau correctly instantiates a plateau on to the mission", () => {
        // Rover Movement execution
        const instruction = "Rover1 Instructions:LMLMLMLMM"

        testMission.readLine(instruction);
        expect(testMission.plateau.width).toBe(5);
    });
});
// Output messages