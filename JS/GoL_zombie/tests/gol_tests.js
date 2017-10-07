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

    var rect = [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },

    ];

    var sort_coord = function(a, b) {
        if (a.x < b.x)
            return -1;
        if (a.x > b.x) {
            return 1;
        }
        return (a.y == b.y) ? 0 : (a.y < b.y) ? -1 : 1;
    };

    // const euros = [29.76, 41.85, 46.5];
    // const above30 = euros.filter(euro => euro >= 30);
    // console.log(above30) // [ 41.85, 46.5]

    it("Will be alive", function() {
        expect(willBeAlive(true, 3)).toBe(true);
        expect(willBeAlive(true, 2)).toBe(true);
        expect(willBeAlive(false, 3)).toBe(true);
        expect(willBeAlive(true, 1)).toBe(false);
        expect(willBeAlive(true, 4)).toBe(false);
        expect(willBeAlive(false, 2)).toBe(false);
        expect(willBeAlive(false, 2)).toBe(false);

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

    it("Death candidates", function() {
        expect(deathCandidates(blinkerVertical).length).toEqual(12);
    })

    it("Next Generation", function() {
        expect(isEqual(nextGeneration(nextGeneration(blinkerVertical)), blinkerVertical)).toBe(true);
        expect(isEqual(nextGeneration(blinkerVertical), blinkerHorizontal)).toBe(true);
        expect(nextGeneration(rect).sort(function(a, b) { return sort_coord(a, b); })).toEqual(rect.sort(function(a, b) { return sort_coord(a, b); }));
    });

    it("Age", function() {
        //expect(age({ x: 1, y: 1 }, nextGeneration(nextGeneration(blinkerVertical)))).toEqual(2);
    });

    it("Zombie", function() {
        //expect(nextGeneration(nextGeneration(nextGeneration(rect))).length).toEqual(0);
    });


    it("Sort by x-y coordinates", function() {
        var ascY = [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }];
        var desY = [{ x: 2, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 1 }];
        expect(desY.sort(function(a, b) { return sort_coord(a, b); })).toEqual(ascY);
        expect(ascY.sort(function(a, b) { return sort_coord(a, b); })).toEqual(desY);
        expect(desY.sort(function(a, b) { return a + b; })).toEqual(ascY);

        // console.log(desY.sort(function(a, b) { return sort_coord(a, b); }));
        // console.log(ascY);


    });

    it("array2toSet", function() {
        var data = [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 1 }];

        var set = data.reduce(function(acc, curr) {
            var k = JSON.stringify(curr);
            if (!acc.hasOwnProperty(k)) { acc[k] = curr; };
            return acc;
        }, {});
        // console.log(set);
    });

    it(" unique array", function() {
        var duplicateArray = [{ x: 2, y: 3 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 3 }];
        var uniArray = [{ x: 2, y: 3 }, { x: 2, y: 1 }, { x: 2, y: 2 }];

        expect(uniqueBy(duplicateArray, JSON.stringify)).toEqual(uniArray);
    });

    it("Is in array", function() {
        expect(isIn({ x: 1, y: 2 }, [{ x: 1, y: 2 }, { x: 1, y: 3 }])).toBe(true);
        expect(isIn({ x: 1, y: 2 }, [{ x: 2, y: 2 }, { x: 1, y: 3 }])).toBe(false);
    });

    it("Is in equal", function() {
        expect(isEqual([{ x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 1, y: 2 }, { x: 2, y: 2 }])).toBe(true);
        expect(isEqual([{ x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 2, y: 2 }, { x: 1, y: 2 }])).toBe(true);
        expect(isEqual([{ x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 2, y: 3 }, { x: 1, y: 2 }])).toBe(false);
    });
});

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