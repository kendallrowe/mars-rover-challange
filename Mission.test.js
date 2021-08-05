const Mission = require("./Mission");
const Plateau = require("./Plateau");
const Rover = require("./Rover");

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
        expect(testMission.plateau.activeRover.id).toBe(1)
        expect(testMission.plateau.rovers.length).toBe(0)
    });

    test("if read line of movement instruction moves a rover", () => {
        // Rover Movement execution
        const instruction = "Rover1 Instructions:LM"

        testMission.readLine(instruction);
        expect(testMission.plateau.activeRover.direction).toBe("W");
        expect(testMission.plateau.activeRover.x).toBe(0);
        expect(testMission.plateau.activeRover.x).toBe(2);
    });

    test("if read line of movement instruction for a destroyed rover triggers no event", () => {
        testMission.plateau.addRover(new Rover(5, 32, 32, "N"));
        // Rover Movement execution
        const instruction = "Rover5 Instructions:LM"

        testMission.readLine(instruction);
        expect(testMission.plateau.activeRover).toBeNull();
        expect(testMission.plateau.rovers.length).toBe(2);
        expect(testMission.plateau.rovers[1].status).toBe("Destroyed");
    });
});

describe("Multiple rover method tests", () => {

    const testMission = new Mission(instructions);
    testMission.plateau = new Plateau(5, 5);
    testMission.plateau.addRover(new Rover(1, 0, 0, "N"));

    test("if read line adding a second rover correctly adds and activates new rover", () => {
        // Rover Movement execution
        const instruction = "Rover2 Landing:3 3 E"

        testMission.readLine(instruction);
        expect(testMission.plateau.activeRover.id).toBe(2)
        expect(testMission.plateau.rovers.length).toBe(1)
    });

    test("if read line of moving second rover moves the active rover", () => {
        // Rover Movement execution
        const instruction = "Rover2 Instructions:RMM"

        testMission.readLine(instruction);
        expect(testMission.plateau.activeRover.direction).toBe("S");
        expect(testMission.plateau.activeRover.x).toBe(3);
        expect(testMission.plateau.activeRover.x).toBe(1);
    });
});
// Output messages