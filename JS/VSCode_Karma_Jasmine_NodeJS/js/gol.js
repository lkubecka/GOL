var RULES = [
    { isAlive: true, neighboursCount: 2 },
    { isAlive: true, neighboursCount: 3 },
    { isAlive: false, neighboursCount: 3 }
];

var result = willAlive(true, 2);

function willAlive(isAlive, neighboursCount) {
    var test = [];
    var val = RULES.some(function(r) {
        test.push(r.isAlive === isAlive && r.neighboursCount === neighboursCount);
        return r.isAlive === isAlive && r.neighboursCount === neighboursCount;
    });
    return val;

}