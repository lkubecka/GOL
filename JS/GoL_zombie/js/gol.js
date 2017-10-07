var RULES = [
    { state: "alive", neighboursCount: 2, nextState: "alive" },
    { state: "alive", neighboursCount: 3, nextState: "alive" },
    { state: "dead", neighboursCount: 3, nextState: "alive" },
    { state: "alive", age: 3, nextState: "zombie" },
    { state: "alive", zombieCount: 1, nextState: "zombie" },
    //{ state: "zombie", nextState: "dead" },

    //{ isAlive: true, neighboursCount: 3 },
    // { isAlive: false, neighboursCount: 3 },
];

var NEIGHBOURS = [
    { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
    { x: -1, y: 0 }, { x: 1, y: 0 },
    { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
];


function uniqueBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
};

function isIn(elem, arr) {
    var lookup = arr.reduce(function(acc, curr) {
        acc[JSON.stringify(curr)] = curr;
        return acc;
    }, {});
    return lookup.hasOwnProperty(JSON.stringify(elem));
};

function isEqual(a, b) {
    return a.filter(function(item) {
        return isIn(item, b);
    }).length === a.length;
};



function willBeAlive(state, neighboursCount) {
    return RULES.some(function(r) {
        return r.state === (isAlive ? "alive" : "dead") && r.neighboursCount === neighboursCount;
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
    return neighbours(cell).filter(function(n) {
        return isAlive(n, generation);
    }).length;
}

function deathCandidates(generation) {
    return uniqueBy(generation.reduce(function(candidates, cell) {
        return candidates.concat(neighbours(cell));
    }, []), JSON.stringify).filter(function(c) {
        return isIn(c, generation) ? false : true;
    });

};

function nextGeneration(livingCells) {
    var deathCells = deathCandidates(livingCells);
    var nextGenDeath = deathCells.reduce(function(acc, cell) {
        var nc = neighboursCount(cell, livingCells);
        if (!isAlive(cell, acc) && (willBeAlive(false, nc)))
            return acc.concat(cell);
        return acc;
    }, []);

    var nextGenLiving = livingCells.reduce(function(acc, cell) {
        var nc = neighboursCount(cell, livingCells);
        if (!isAlive(cell, acc) && (willBeAlive(true, nc)))
            return acc.concat(cell);
        return acc;
    }, []);

    nextGenLiving.map(function(c) {
        return { x: c.x, y: c.y, gen: c.gen + 1 };
    });
    return nextGenDeath.concat(nextGenLiving);
}