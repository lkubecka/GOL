var RULES = [
    { isAlive: true, neighboursCount: 2 },
    { isAlive: true, neighboursCount: 3 },
    { isAlive: false, neighboursCount: 3 }
];

var NEIGHBOURS = [
    { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
    { x: -1, y: 0 }, { x: 1, y: 0 },
    { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
];

var result = willAlive(true, 2);

function willAlive(isAlive, neighboursCount) {
    return RULES.some(function(r) {
        return r.isAlive === isAlive && r.neighboursCount === neighboursCount;
    });
}

function isAlive(cell, generation) {
    return generation.some(function(c) {
        return c.x === cell.x && c.y === cell.y;
    })
}

function neighbours(cell) {
    return NEIGHBOURS.map(function(n) {
        return { x: cell.x + n.x, y: cell.y + n.y };
    })
}

function neighboursCount(cell, generation) {
    return neighbours(cell).reduce(function(num, n) {
        return num + (isAlive(n, generation) ? 1 : 0);
    }, 0);
}

function candidates(generation) {
    return generation.reduce(function(candidates, cell) {
        return candidates.concat(neighbours(cell)).concat([cell]);
    }, [])
}

function nextGeneration(generation) {
    return candidates(generation).reduce(function(nextGeneration, candidate) {
        return !isAlive(candidate, nextGeneration) && (willAlive(isAlive(candidate, generation), neighboursCount(candidate, generation))) ? nextGeneration.concat(candidate) : nextGeneration;
    }, [])
}