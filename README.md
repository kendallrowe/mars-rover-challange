# KR Approach
## Assumptions
1. Out of bounds movement will trigger a mission over event
2. Collision with other rovers on the mission plateau will trigger a mission over event
3. No collission terrain on the mission plateau
4. Rovers will move sequentially (Rover 1 completes all moves, then Rover 2 lands and completes all moves)

## Approach:
There are a few different approaches to be used for building this app. Each will have pros and cons that I have outlined below to describe why I have selected the approach that I have:
### Rover Classes without a Missionplateau
Due to the simplicity of the mission plateau itself and lack of collision terrain there is not actually a need to render a mission plateau in memory. Tracking movement in this case will consist of the following steps:
1. Read current location from direction, x, y attributes of the rover
2. Implement direction change if required (left vs right)
3. If forward move read from current direction attribute to determine whether movement will be increase/decrease to x/y
4. Collision checks
    * Does move leave the coordinates of the mission plateau?
    * Check for all rovers currently active whether they are currently occupying the destination square
5. Update current coordinates

#### Pros:
* Simple approach. Does not require nested array lookups for each turn  move. Can update and track all movement within a single rover class without array updating and checking.
* Efficient time and space complexity - Movements can be tracked by simple monitoring current location coordinates without interacting with a nested array/matrix mission plateau.

#### Cons:
* Lack of future flexibility if requirements were to change:
    * Implement collision terrain on the plateau require another class object
    * Rendering graphical interface of the missionplateau would require a separate feature build

### Missionplateau with nested array:
This is the most intuitive logical approach. By creating a matrix nested array that contains an letter "nN", "nE", "nS", "nW" where n represents the current rover number, a single plateau can be used to  track the entire state of the mission. A separate array could be used to track the current active rovers and their current locations if desired. Movement would be tracked by completing an algorithm to:
1. Find location of current rover (either by scanning missionplateau or using active rover tracker array)
2. Read state of rover (id number and current direction)
3. Check state of next square for collision criteria
4. Update square of destination if move successful or trigger destruction event if collision

#### Pros:
* Easy to integrate new changes to mission plateau state such as new collision terrain
* Missionplateau can be rendered at any time since it is always live and updated

#### Cons:
* Tracking movement requires navigation of nested array. Each lookup and movement will require updating the previous square and destination squares to new values.
* Future flexibility of features of rovers would be challenging (e.g. introduce number of lives for a rover.)

### Missionplateau class with Rover classes
Hybrid approach of the above two. Leverage rover classes and a missionplateau class to track state of all existing items on the plateau. Can either maintain an actual nested array at all times that represents the current location of all items or can use a render method to generate the current state on demand depending on requirements.

Movement tracking would match that in approach one with a difference being in that all active rovers would be stored within the Plateau class instead of a global array.

#### Pros:
* Future flexibility to changes in requirements since each class is modular and can have new items such as terrain or life points on rovers added separately.'
* Remains an efficient solution both in space and time complexity if choosing to only render the missionplateau on demand.

#### Cons:
* No signficant downside vs either other approach

## Decision
Based on future compatibility, easy of development and performance I decided to develop the third approach - leveraging a rover class and plateau/mission class. 

# Requirements

## Mars Rover

![Mars Rover](/rover.jpg?raw=true "Mars Rover")

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on plateau cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be `0, 0, N`, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are `L`, `R` and `M`:

* `L` and `R` makes the rover spin 90 degrees left or right respectively, without moving from its current spot.

* `M` means move forward one grid point, and maintains the same heading.

Assume that the square directly North from `(x, y)` is `(x, y+1)`.

### Input:

**Configuration Input**: The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be `0,0`.

### Per Rover Input:

**Input 1**: Landing co-ordinates for the named Rover. The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.

**Input 2**: Navigation instructions for the named rover. i.e a string containing (`L`, `R`, `M`).

### Test Input:
```bash
Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM
Rover2 Landing:3 3 E
Rover2 Instructions:MMRMMRMRRM
```

### Expected Output:
```bash
Rover1:1 3 N
Rover2:5 1 E
```
### Task:

Develop a simple app that can take various inputs _(from the command line or a textarea if coding in browser)_ and generate the desired outputs. The application must accept a sequence of inputs. An example of this input:
```bash
# Command line example
$ app < input.txt
Rover1:1 3 N
Rover2:5 1 E
$
```
See `input.txt` in this repo for a sample test input.

### Expectations:

- App should be working
- Code should be modular and readable
- Unit tests
- Whatever language and runtime you're comfortable with (eg. Python, Node.js, Javascript in browser)
