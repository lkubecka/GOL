describe("Game of life", function() {
    var blinkerVertical = [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
    ];

    var blinkerHorizontal = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
    ];

    it("Will be alive", function() {
        expect(willAlive(true, 2)).toBe(true);
        expect(willAlive(true, 3)).toBe(true);
        expect(willAlive(false, 3)).toBe(true);
        expect(willAlive(true, 1)).toBe(false);
        expect(willAlive(true, 4)).toBe(false);
        expect(willAlive(false, 2)).toBe(false);
    });

    it("Is Alive", function() {
        expect(isAlive({ x: 1, y: 0 }, blinkerVertical)).toBe(true);
        expect(isAlive({ x: 1, y: -1 }, blinkerVertical)).toBe(false);
    })

    it("Neighbours", function() {
        expect(neighbours({ x: 0, y: 0 }).length).toEqual(8);
        expect(neighbours({ x: 0, y: 0 })).toEqual(NEIGHBOURS);
    })

    it("NeighboursCount", function() {
        expect(neighboursCount({ x: 1, y: 1 }, blinkerVertical)).toEqual(2);
        expect(neighboursCount({ x: 1, y: 0 }, blinkerVertical)).toEqual(1);
        expect(neighboursCount({ x: 0, y: 1 }, blinkerVertical)).toEqual(3);
        expect(neighboursCount({ x: 2, y: 1 }, blinkerVertical)).toEqual(3);
    })

    it("Candidates", function() {
        expect(candidates(blinkerVertical).length).toEqual(3 * 9);
    })

    it("Next Generation", function() {
        expect(nextGeneration(nextGeneration(blinkerVertical))).toEqual(blinkerVertical);
        expect(nextGeneration(blinkerVertical)).toEqual(blinkerHorizontal);
    })


    // Pseudocode
    // candidates = getCandidates(gen)
    //   getCandidates(gen)
    //     return union of gen and neighbours(gen)
    // for each cell in candidates
    //   if willLive(cell) push it to nextGen
    //   willLive(cell)
    //     neighboursCount = getNumberOfAliveNeighbours(cell)
    //         neighbours = getNeighbours(cell)
    //         foreach n from neighbours
    //          push n to aliveNeighbours if isAlive(n, gen)
    //         return aliveNeighbours.length
    //     return applyRules(cell.state, neighboursCount)




});